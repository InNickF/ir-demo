import { FC } from "react";
import { Select } from "in-ui-react";
import { GenericFilterPayload, GenericChoices } from "@/commons/typings";
import { InputsColor } from "in-ui-react/dist/lib/components/utils/types";

interface SelectFieldsProps {
  selects: GenericChoices;
  currentFilters: GenericFilterPayload;
  loading?: boolean;
  setSelectValue: (key: string, value: string) => void;
  className?: string;
  color?: InputsColor;
}

export const SelectFields: FC<SelectFieldsProps> = ({
  selects,
  setSelectValue,
  currentFilters,
  loading = false,
  className,
  color,
}) => {
  return (
    <>
      {selects?.map((filter) => {
        return (
          <Select
            className={className}
            key={filter.key}
            label={filter.name}
            name={filter.key}
            options={filter.options}
            loading={loading}
            color={color}
            isClearable
            value={
              filter.options.find(
                (option) => option.value === currentFilters[filter.key]
              ) || null
            }
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={(original) =>
              setSelectValue(filter.key, original?.value || "")
            }
            menuPortalTarget={document.body}
          />
        );
      })}
    </>
  );
};
