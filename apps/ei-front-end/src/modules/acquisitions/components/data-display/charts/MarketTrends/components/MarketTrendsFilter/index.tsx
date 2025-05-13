import { CompstackCompTypeWithAllKeyLabelValue } from "@/acquisitions/utils";
import { Select } from "in-ui-react";
import { FC } from "react";

interface MarketTrendsFilterProps {
  onFiltering: (filter: CompstackCompTypeWithAllKeyLabelValue) => void;
  options: CompstackCompTypeWithAllKeyLabelValue[];
  value: CompstackCompTypeWithAllKeyLabelValue;
}
export const MarketTrendsFilter: FC<MarketTrendsFilterProps> = ({
  options,
  value,
  onFiltering,
}) => {
  return (
    <Select
      className="max-w-[theme(spacing.44)]"
      options={options}
      value={value}
      onChange={(option) => {
        onFiltering(option);
      }}
    />
  );
};
