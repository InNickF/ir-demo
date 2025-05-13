import { Input, InputProps, setComponentRefs } from "in-ui-react";
import { forwardRef, useEffect } from "react";
import {
  ReactGoogleAutocompleteProps,
  usePlacesWidget,
} from "react-google-autocomplete";

export interface AutocompleteAddressInputProps extends InputProps {
  placesWidgetOptions?: ReactGoogleAutocompleteProps;
}

export const AutocompleteAddressInput = forwardRef<
  HTMLInputElement,
  AutocompleteAddressInputProps
>(({ placesWidgetOptions, className, ...props }, ref) => {
  const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_TOKEN;

  placesWidgetOptions ||= {};
  placesWidgetOptions.language ||= "en";
  placesWidgetOptions.onPlaceSelected ||= null;
  placesWidgetOptions.options ||= {};
  placesWidgetOptions.options.types ||= ["address"];
  placesWidgetOptions.options.componentRestrictions ||= {
    country: "us",
  };
  placesWidgetOptions.options.componentRestrictions.country ||= "us";
  placesWidgetOptions.apiKey ||= API_KEY + "&callback=_gAddressInit";

  // clean up pac-container after unmount (this comes from google autocomplete component)
  useEffect(() => {
    const windowMap = window as typeof window & { _gAddressInit: () => void };
    window && (windowMap._gAddressInit = () => null);
    return () => {
      if (window) {
        const searchNode = document.querySelectorAll(
          "div.pac-container.pac-logo"
        );
        searchNode?.forEach((node) => node?.remove());
      }
    };
  }, []);

  const { ref: inputRef } = usePlacesWidget<HTMLInputElement>({
    ...placesWidgetOptions,
  });

  const getClasses = () => {
    const classes = ["autocomplete-address-input"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Input
      className={getClasses()}
      ref={setComponentRefs(inputRef, ref)}
      {...props}
    />
  );
});

AutocompleteAddressInput.displayName = "AutocompleteAddressInput";
