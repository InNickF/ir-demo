import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useCompstackCompChoices } from "@/modules/acquisitions/services/queries/filters";
import { useEffect, useState } from "react";

export const CompFormLeaseAndTransactionTypeSelect = <
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

  const { data: compChoicesChoices = [], isLoading: isFiltersLoading } =
    useCompstackCompChoices();

  const options =
    compChoicesChoices?.find((filter) => filter.key === props.identifier)
      ?.options || [];

  return (
    <>
      {domLoaded ? (
        <GenericControlledSelect
          {...props}
          loading={isFiltersLoading}
          options={options as Options[]}
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
