import { AutocompleteAddressInputProps } from "@/commons/components/data-entry/AutocompleteAddressInput";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { extractAddressComponentsFromGooglePlace } from "@/commons/utils/google-addresses";
import { inputRegisterWithRequiredAttribute } from "@/commons/utils/input-register-with-required-attribute";
import { required } from "@/commons/utils/input-validations";
import {
  CompstackCompKeysPayloadByType,
  CompstackCompType,
} from "@/modules/acquisitions/typings/market-analytics";
import { Input } from "in-ui-react";
import { useRef } from "react";
import {
  Path,
  PathValue,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface CompFormAddressAutocompleteInputProps<
  T extends CompstackCompType
> extends AutocompleteAddressInputProps {
  setValue: UseFormSetValue<CompstackCompKeysPayloadByType[T]>;
  getValues: UseFormGetValues<CompstackCompKeysPayloadByType[T]>;
  register: UseFormRegister<CompstackCompKeysPayloadByType[T]>;
  addressKey: string;
}

export const CompFormAddressAutocompleteInput = <T extends CompstackCompType>({
  label,
  placesWidgetOptions,
  placeholder,
  hint,
  setValue,
  getValues,
  register,
  addressKey,
  ...props
}: CompFormAddressAutocompleteInputProps<T>) => {
  // Warning: We are using as Path<T> because of a bug in react-hook-form, change it on rhf V8
  const hasSelectedADate = useRef(true);
  const inputAddressRef = useRef<HTMLInputElement>(null);

  const unFocusInputAddress = () => {
    // Force react-hook-form to validate the input
    inputAddressRef.current?.focus();
    inputAddressRef.current?.blur();
  };

  const setAddress = (place: google.maps.places.PlaceResult) => {
    const { address, city, state, zipCode, latitude, longitude } =
      extractAddressComponentsFromGooglePlace(place);

    setValue(
      addressKey as Path<CompstackCompKeysPayloadByType[T]>,
      address as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "latitude" as Path<CompstackCompKeysPayloadByType[T]>,
      latitude as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "longitude" as Path<CompstackCompKeysPayloadByType[T]>,
      longitude as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "city" as Path<CompstackCompKeysPayloadByType[T]>,
      city as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "state" as Path<CompstackCompKeysPayloadByType[T]>,
      state as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "zip_code" as Path<CompstackCompKeysPayloadByType[T]>,
      zipCode as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );
  };

  const unsetAddress = () => {
    setValue(
      addressKey as Path<CompstackCompKeysPayloadByType[T]>,
      "" as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "latitude" as Path<CompstackCompKeysPayloadByType[T]>,
      "" as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "longitude" as Path<CompstackCompKeysPayloadByType[T]>,
      "" as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "city" as Path<CompstackCompKeysPayloadByType[T]>,
      "" as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "state" as Path<CompstackCompKeysPayloadByType[T]>,
      "" as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );

    setValue(
      "zip_code" as Path<CompstackCompKeysPayloadByType[T]>,
      "" as PathValue<
        CompstackCompKeysPayloadByType[T],
        Path<CompstackCompKeysPayloadByType[T]>
      >
    );
  };

  placesWidgetOptions ||= {};
  placesWidgetOptions.onPlaceSelected ||= (place) => {
    if (!place || !place.geometry) return;

    unsetAddress();

    setAddress(place);

    hasSelectedADate.current = true;

    unFocusInputAddress();
  };

  return (
    <>
      <Input
        label={label}
        placeholder={placeholder}
        hint={hint}
        {...props}
        {...(register &&
          inputRegisterWithRequiredAttribute(
            register(addressKey as Path<CompstackCompKeysPayloadByType[T]>, {
              required: required(humanizeSnakeCase(addressKey)),
              validate: () => {
                const lat = getValues(
                  "latitude" as Path<CompstackCompKeysPayloadByType[T]>
                ) as string;
                const lng = getValues(
                  "longitude" as Path<CompstackCompKeysPayloadByType[T]>
                ) as string;
                const hasValues = lat && lng;
                const isValid = hasValues && hasSelectedADate.current;

                return isValid || "Select an address from the list.";
              },
              onChange: () => {
                hasSelectedADate.current = false;
              },
            })
          ))}
        ref={inputAddressRef}
      />
    </>
  );
};
