import { AutocompleteAddressInputProps } from "@/commons/components/data-entry/AutocompleteAddressInput";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericAddressLatLong } from "@/commons/typings/addresses";
import {
  maxLatitude,
  maxLongitude,
  minLatitude,
  minLongitude,
  required,
} from "@/commons/utils/input-validations";
import { validateIfDealAddressAlreadyExists } from "@/modules/acquisitions/utils/deals";
import { validateLatLngHasValidMarket } from "@/modules/acquisitions/utils/markets";
import { Input } from "in-ui-react";
import { useAtom } from "jotai";
import { useMemo, useRef, useState } from "react";
import {
  Path,
  PathValue,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface AddressLatLngInputProps<T extends GenericAddressLatLong>
  extends AutocompleteAddressInputProps {
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
  validMarketErrorMessage?: string;
  errorMessage: string;
  ignoreLatLong: boolean;
  validateLatLngVSMarket?: boolean;
}
// Warning: We are using as Path<T> because of a bug in react-hook-form, change it on rhf V8
export const AddressLatLngInput = <T extends GenericAddressLatLong>({
  setValue,
  getValues,
  register,
  placesWidgetOptions,
  label = "Address",
  errorMessage = "Select an address from the list.",
  placeholder = "Type and select an address from the list",
  hint = "Used to get the longitude and latitude.",
  validMarketErrorMessage = "Select an address inside of a valid market.",
  ignoreLatLong = false,
  validateLatLngVSMarket = true,
  ...props
}: AddressLatLngInputProps<T>) => {
  const hasSelectedADate = useRef(true);
  const hasToSelectAValidMarket = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);
  const inputAddressRef = useRef<HTMLInputElement>(null);

  const setValues = (place: google.maps.places.PlaceResult) => {
    setValue(
      "address" as Path<T>,
      place.formatted_address as PathValue<T, Path<T>>
    );
    setValue(
      "latitude" as Path<T>,
      place.geometry.location.lat() as PathValue<T, Path<T>>
    );
    setValue(
      "longitude" as Path<T>,
      place.geometry.location.lng() as PathValue<T, Path<T>>
    );
    hasSelectedADate.current = true;
  };

  const unsetValues = () => {
    setValue("address" as Path<T>, "" as PathValue<T, Path<T>>);
    setValue("latitude" as Path<T>, "" as PathValue<T, Path<T>>);
    setValue("longitude" as Path<T>, "" as PathValue<T, Path<T>>);
  };

  const focusInputAddress = ({ clear } = { clear: true }) => {
    if (clear) {
      inputAddressRef.current.value = "";
    }
    inputAddressRef.current?.focus();
  };

  const onError = () => {
    createNotification({
      kind: "error",
      subject: "Occur an error while validating the address.",
      message:
        "Please, try again or contact the support team if the problem persists.",
    });
    unsetValues();
    focusInputAddress({ clear: false });
  };

  const unFocusInputAddress = () => {
    // Force react-hook-form to validate the input
    inputAddressRef.current?.focus();
    inputAddressRef.current?.blur();
  };

  placesWidgetOptions ||= {};
  placesWidgetOptions.onPlaceSelected ||= (place) => {
    if (!place || !place.geometry) return;
    if (!validateLatLngVSMarket) {
      setValues(place);
      unFocusInputAddress();
      return;
    }

    setIsLoading(true);
    validateIfDealAddressAlreadyExists({
      address: place.formatted_address,
    })
      .then((exists) => {
        if (exists) {
          createNotification({
            kind: "warning",
            subject: "The address is already in use.",
            message:
              "There is a deal using this address. Please, search and select an address that is not in use.",
          });
          unsetValues();
          focusInputAddress();
          return;
        }

        validateLatLngHasValidMarket({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        })
          .then((isValid) => {
            if (isValid) {
              setValues(place);
              unFocusInputAddress();
            } else {
              createNotification({
                kind: "warning",
                subject: "The selected address is inside of an invalid market.",
                message:
                  "Please, search and select an address inside of a valid market.",
              });
              unsetValues();
              focusInputAddress();
            }
          })
          .catch(onError)
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(onError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const memoLatitudeValidations = useMemo(() => {
    if (ignoreLatLong) return {};
    return {
      required: required("latitude"),
      min: minLatitude(),
      max: maxLatitude(),
    };
  }, [ignoreLatLong]);

  const memoLongitudeValidations = useMemo(() => {
    if (ignoreLatLong) return {};
    return {
      required: required("longitude"),
      min: minLongitude(),
      max: maxLongitude(),
    };
  }, [ignoreLatLong]);

  return (
    <>
      <Input
        label={label}
        placeholder={placeholder}
        hint={hint}
        readOnly={isLoading}
        loading={isLoading}
        {...props}
        {...(register &&
          register("address" as Path<T>, {
            required: required("Address"),
            validate: () => {
              if (hasToSelectAValidMarket.current) {
                return validMarketErrorMessage;
              }
              const lat = getValues("latitude" as Path<T>) as string;
              const lng = getValues("longitude" as Path<T>) as string;
              const hasValues = lat && lng;
              const isValid =
                (hasValues && hasSelectedADate.current) || ignoreLatLong;
              return isValid || errorMessage;
            },
            onChange: () => {
              hasSelectedADate.current = false;
            },
          }))}
        ref={inputAddressRef}
      />
      {/* <Input
        label="latitude"
        className="hidden"
        type="hidden"
        {...register("latitude" as Path<T>, memoLatitudeValidations)}
        readOnly
      />
      <Input
        label="longitude"
        className="hidden"
        type="hidden"
        {...register("longitude" as Path<T>, memoLongitudeValidations)}
        readOnly
      /> */}
    </>
  );
};

AddressLatLngInput.displayName = "AddressLatLngInput";
