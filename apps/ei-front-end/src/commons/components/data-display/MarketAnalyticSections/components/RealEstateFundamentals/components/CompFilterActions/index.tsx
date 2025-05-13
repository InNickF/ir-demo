import { GenericLabelValueObject } from "@/commons/typings";
import { FiltersPayloadType, Select } from "in-ui-react";
import { FC } from "react";

interface CompFilterActionsProps {
  onFiltering: (filter: FiltersPayloadType) => void;
  typeOptions: GenericLabelValueObject[];
  typeDefaultValue: GenericLabelValueObject;
}

export const CompFilterActions: FC<CompFilterActionsProps> = ({
  onFiltering,
  typeOptions,
  typeDefaultValue,
}) => {
  return (
    <>
      <Select
        label="Type"
        options={typeOptions}
        value={typeDefaultValue}
        onChange={(option) => {
          onFiltering({ type: option.value });
        }}
      />
    </>
  );
};
