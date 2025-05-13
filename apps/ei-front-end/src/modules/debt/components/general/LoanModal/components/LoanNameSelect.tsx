import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useDebtLoans } from "@/modules/debt/services/queries/loans";
import { useEffect, useState } from "react";

export const LoanNameSelect = <
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

  const { data, isLoading } = useDebtLoans();

  const options =
    data?.results?.map((loan) => ({
      label: loan.loan_name,
      value: loan.id,
    })) || [];

  return (
    <>
      {domLoaded ? (
        <GenericControlledSelect
          {...props}
          isCreatable
          isSearchable
          loading={isLoading}
          options={options as Options[]}
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
