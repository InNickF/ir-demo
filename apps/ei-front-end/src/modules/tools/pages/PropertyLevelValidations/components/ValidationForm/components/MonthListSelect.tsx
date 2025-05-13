import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { getMonthsList } from "@/commons/utils/dates";
import { useEffect, useState } from "react";

export const MonthListSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues> & {
    monthSelected?: number;
  }
) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
      side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const selectableMonths = getMonthsList({
    order: "asc",
  });

  return (
    <>
      {domLoaded ? (
        <GenericControlledSelect
          {...props}
          value={
            selectableMonths?.find(
              (year) => year.value === props.monthSelected
            ) as Options
          }
          options={selectableMonths as Options[]}
          placeholder="Select a month"
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
