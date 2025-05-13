import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useDebtFilters } from "@/modules/debt/services/queries/filters";
import { useEffect, useState } from "react";

export const LoanChathamCapSelect = <
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

  const { data: loanFilters, isLoading } = useDebtFilters();

  const options =
    loanFilters?.find((filter) => filter.key === "loan_cap")?.options || [];

  return (
    <>
      {domLoaded ? (
        <GenericControlledSelect
          {...props}
          loading={isLoading}
          options={options as Options[]}
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
