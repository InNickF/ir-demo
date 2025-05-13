import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { getYearsList } from "@/commons/utils/dates";
import { useEffect, useState } from "react";

export const CompFormYearListSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues> & {
    yearSelected?: number;
  }
) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
      side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const selectableYears = getYearsList({
    from: 1900,
    to: "today",
  });

  return (
    <>
      {domLoaded ? (
        <GenericControlledSelect
          {...props}
          value={
            selectableYears?.find(
              (year) => year.value === props.yearSelected
            ) as Options
          }
          options={selectableYears as Options[]}
          placeholder="Select a year"
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
