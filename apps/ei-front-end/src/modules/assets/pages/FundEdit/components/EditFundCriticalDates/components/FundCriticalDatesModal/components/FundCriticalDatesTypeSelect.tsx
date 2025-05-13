import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { PROPERTY_TIMELINE_TYPES } from "@/modules/assets/utils";
import { useEffect, useState } from "react";

export const FundCriticalDatesTypeSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
      side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded ? (
        <GenericControlledSelect
          {...props}
          options={PROPERTY_TIMELINE_TYPES as Options[]}
          placeholder="Type"
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
