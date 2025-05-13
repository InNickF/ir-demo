import { GenericLabelValueObject } from "@/commons/typings";
import { CompstackCompType } from "@/modules/acquisitions/typings/market-analytics";
import { Select } from "in-ui-react";
import { FC, useEffect, useState } from "react";

interface CompTypeSelectProps {
  className?: string;
  value: CompstackCompType;
  onChange: (option: CompstackCompType) => void;
  hideSelect?: boolean;
}

export const CompTypeSelect: FC<CompTypeSelectProps> = ({
  className,
  value,
  onChange,
  hideSelect,
}) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
      side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const options: GenericLabelValueObject[] = [
    { label: "Land", value: "land" },
    { label: "Lease", value: "lease" },
    { label: "Sale", value: "sale" },
  ];

  return (
    <>
      {domLoaded && !hideSelect ? (
        <Select
          label="Type"
          className={className}
          onChange={(option) => onChange(option.value as CompstackCompType)}
          options={options}
          value={value ? options.find((v) => v.value === value) : null}
          menuPortalTarget={document.body}
        />
      ) : null}
    </>
  );
};
