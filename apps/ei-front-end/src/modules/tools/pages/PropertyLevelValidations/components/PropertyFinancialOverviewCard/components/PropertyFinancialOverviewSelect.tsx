import { PropertyFinancialOverviewViews } from "@/modules/tools/typings/property-level-validations";
import { FINANCIAL_OVERVIEW_VIEWS } from "@/modules/tools/utils/property-level-validations";
import { Select } from "in-ui-react";
import { FC, useEffect, useState } from "react";

interface PropertyFinancialOverviewSelectProps {
  className?: string;
  value: PropertyFinancialOverviewViews;
  onChange: (option: PropertyFinancialOverviewViews) => void;
}
export const PropertyFinancialOverviewSelect: FC<
  PropertyFinancialOverviewSelectProps
> = ({ className, value, onChange }) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
        side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const overviewSelectOptions = FINANCIAL_OVERVIEW_VIEWS.map((view) => ({
    value: view,
    label: view,
  }));

  return (
    <>
      {domLoaded ? (
        <Select
          placeholder="Select Financial View"
          className={getClasses()}
          options={overviewSelectOptions}
          onChange={(option) => {
            onChange(option.value as PropertyFinancialOverviewViews);
          }}
          value={overviewSelectOptions.find((option) => option.value === value)}
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
