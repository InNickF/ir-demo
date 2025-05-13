import { GenericLabelValueObject } from "@/commons/typings";
import { FiltersPayloadType, Select } from "in-ui-react";
import { FC } from "react";

interface CompstackLeaseCompsTrendChartFiltersProps {
  onFiltering: (filter: FiltersPayloadType) => void;
  kindOptions: GenericLabelValueObject[];
  timeOptions: GenericLabelValueObject[];
}
export const CompstackLeaseCompsTrendChartFilters: FC<
  CompstackLeaseCompsTrendChartFiltersProps
> = ({ onFiltering, kindOptions, timeOptions }) => {
  return (
    <>
      <Select
        className="max-w-[theme(spacing.44)]"
        options={kindOptions}
        defaultValue={kindOptions[0]}
        onChange={(option) => {
          onFiltering({
            x_axis: option.value,
          });
        }}
      />
      <Select
        className="max-w-[theme(spacing.28)]"
        options={timeOptions}
        defaultValue={timeOptions[0]}
        onChange={(option) => {
          onFiltering({
            y_axis: option.value,
          });
        }}
      />
    </>
  );
};
