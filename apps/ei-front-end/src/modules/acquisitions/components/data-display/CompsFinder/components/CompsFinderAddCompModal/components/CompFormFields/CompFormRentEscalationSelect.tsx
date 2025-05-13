import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useCompstackCompChoices } from "@/modules/acquisitions/services/queries/filters";
import { useEffect, useState } from "react";

export const CompFormRentEscalationSelect = <
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

  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useCompstackCompChoices();

  const rentEscalationOptions =
    dealChoices?.find((filter) => filter.key === "rent_escalation_type")
      ?.options || [];

  return (
    <>
      {domLoaded ? (
        <GenericControlledSelect
          {...props}
          isLoading={isFiltersLoading}
          options={rentEscalationOptions as Options[]}
          placeholder="Rent escalation type"
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
