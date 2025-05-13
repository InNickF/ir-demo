import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useEffect, useState } from "react";
import { LoanStatusSelectOptions } from "../utils";

export const LoanStatusSelect = <
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
          defaultValue={
            LoanStatusSelectOptions.find(
              (option) => option.value === props.value
            ) as Options
          }
          value={
            LoanStatusSelectOptions.find(
              (option) => option.value === props.value
            ) as Options
          }
          options={LoanStatusSelectOptions as Options[]}
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
