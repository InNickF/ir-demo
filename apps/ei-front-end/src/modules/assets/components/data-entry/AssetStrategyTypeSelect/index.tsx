import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { FundStrategyTypes } from "@/modules/assets/typings/funds";
import { assetStrategyTypes } from "@/modules/assets/utils";
import { Select } from "in-ui-react";
import { FC, useEffect, useState } from "react";

interface AssetStrategyTypeSelectProps {
  className?: string;
  value: FundStrategyTypes;
  onChange: (option: FundStrategyTypes) => void;
}
export const AssetStrategyTypeSelect: FC<AssetStrategyTypeSelectProps> = ({
  className,
  value,
  onChange,
}) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
        side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const fundStrategyTypesOptions = assetStrategyTypes.map((type) => ({
    label: convertToTitleCase(type),
    value: type,
  }));

  const getClasses = () => {
    const classes = ["acq-bulk-deals-select"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <>
      {domLoaded ? (
        <Select
          placeholder="Select Strategy Type"
          className={getClasses()}
          options={fundStrategyTypesOptions}
          onChange={(option) => {
            onChange(option.value as FundStrategyTypes);
          }}
          value={fundStrategyTypesOptions.find(
            (option) => option.value === value
          )}
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
