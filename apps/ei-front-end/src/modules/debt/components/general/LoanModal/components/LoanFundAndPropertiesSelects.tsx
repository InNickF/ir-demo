import { GenericLabelValueObject } from "@/commons/typings";
import { defaultPaginatedData } from "@/commons/utils";
import { useDebtProperties } from "@/modules/debt/services/queries/properties";
import { Select, SelectProps } from "in-ui-react";
import { useEffect, useMemo, useState } from "react";

export const LoanFundAndPropertiesSelects = <Options, IsMulti extends boolean>({
  onChange,
  ...props
}: Omit<SelectProps<Options, IsMulti>, "onChange"> & {
  onChange?: (value: GenericLabelValueObject[]) => void;
}) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
      side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);
  const [fund, setFund] = useState<Options>(null);
  const [properties, setProperties] = useState<Options[]>([]);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const { data = defaultPaginatedData, isLoading } = useDebtProperties({
    page_size: "-1",
  });

  const funds = useMemo(
    () =>
      Array.from(
        new Set(data?.results?.map((property) => property.fund_name) || [])
      )?.map((fund) => ({ label: fund, value: fund })) || [],
    [data]
  );

  const filteredProperties = useMemo(
    () =>
      data?.results
        ?.filter(
          (property) =>
            property.fund_name === (fund as GenericLabelValueObject)?.label
        )
        ?.map((property) => ({
          label: property.name,
          value: property.yardi_property_code,
        })) || [],
    [data, fund]
  );

  return domLoaded ? (
    <>
      <Select
        {...props}
        label="Fund"
        loading={isLoading}
        options={funds as Options[]}
        menuPortalTarget={document.body}
        isSearchable
        error={
          props.error
            ? "You must choose a Fund and then at least one Property"
            : null
        }
        value={fund}
        onChange={(value) => {
          setFund(value as Options);
          setProperties([]);
        }}
        required
      />
      <Select
        isMulti
        label="Properties"
        {...props}
        loading={isLoading}
        disabled={!fund}
        options={filteredProperties as Options[]}
        menuPortalTarget={document.body}
        isClearable
        isSearchable
        error={props.error ? "You have to choose at least one Property" : null}
        value={properties}
        onChange={(value) => {
          setProperties(value as Options[]);
          onChange?.(value as GenericLabelValueObject[]);
        }}
        required
      />
    </>
  ) : null;
};
