import { useDebounce } from "@/commons/hooks/useDebounce";
import { GenericLabelValueObject, IsLoadingProp } from "@/commons/typings";
import { getYearsList } from "@/commons/utils/dates";
import { Button, FiltersPayloadType, Select } from "in-ui-react";
import { FC, useCallback, useState } from "react";
import { z } from "zod";

const ZodNumberSchema = z.number();

interface AgeYearInputsProps extends IsLoadingProp {
  filteredOptions: FiltersPayloadType;
  onApply: (payload: FiltersPayloadType) => void;
  fromName?: string;
  toName?: string;
  accessor?: string;
  showApplyButton?: boolean;
  onClear?: () => void;
}

export const AgeYearInputs: FC<AgeYearInputsProps> = ({
  filteredOptions,
  onApply,
  isLoading,
  fromName = "from_date",
  toName = "to_date",
  accessor = "date",
  showApplyButton = false,
  onClear,
}) => {
  const [values, setValues] = useState({ [fromName]: "", [toName]: "" });

  const applyChanges = useCallback(() => {
    const fromValue = values?.[fromName]
      ? { [fromName]: values?.[fromName] }
      : {};

    const toValue = values?.[toName] ? { [toName]: values?.[toName] } : {};

    if (!toValue && !fromValue) {
      onApply({
        ...filteredOptions,
        [accessor]: "",
      });
    }

    const filter = {
      ...fromValue,
      ...toValue,
    };

    const isFilterEmpty = Object.values(filter).every((v) => !v);
    onApply({
      ...filteredOptions,
      [accessor]: isFilterEmpty ? "" : filter,
    });
  }, [values, fromName, toName, accessor, filteredOptions, onApply]);

  const onChange = ({ name, value }: { name: string; value: string }) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onApplyButtonClick = () => {
    applyChanges();
  };

  const onClearButtonClick = () => {
    setValues({ [fromName]: "", [toName]: "" });
    if (onClear) {
      onClear();
    }
  };

  useDebounce({
    delay: 500,
    value: values,
    onFinish: applyChanges,
    enabled: !showApplyButton,
  });

  const minYear = 1800;
  const fromYears = getYearsList({
    from: minYear,
    to: values?.[toName] ? parseInt(values?.[toName]) : "today",
  });

  const toYears = getYearsList({
    from: values?.[fromName] ? parseInt(values?.[fromName]) : minYear,
    to: "today",
  });

  return (
    <>
      <div className="relative z-control flex flex-col gap-2 p-2">
        <Select
          label="From"
          options={fromYears}
          placeholder="Select a year"
          onChange={(year) =>
            onChange({ name: fromName, value: year?.value?.toString() })
          }
          isLoading={isLoading}
          color="over-ghost"
          value={
            values?.[fromName]
              ? ({
                  label: `${values?.[fromName]}`,
                  value: Number(values?.[fromName]),
                } as GenericLabelValueObject<typeof ZodNumberSchema>)
              : null
          }
        />
        <Select
          label="To"
          options={toYears}
          placeholder="Select a year"
          onChange={(year) =>
            onChange({ name: toName, value: year?.value?.toString() })
          }
          isLoading={isLoading}
          color="over-ghost"
          value={
            values?.[toName]
              ? ({
                  label: `${values?.[toName]}`,
                  value: Number(values?.[toName]),
                } as GenericLabelValueObject<typeof ZodNumberSchema>)
              : null
          }
        />
      </div>
      <div className="pt-3 relative z-base">
        {showApplyButton ? (
          <Button kind="solid" block onClick={onApplyButtonClick}>
            Apply
          </Button>
        ) : null}
        {onClear ? (
          <Button kind="ghost" block onClick={onClearButtonClick}>
            Clear
          </Button>
        ) : null}
      </div>
    </>
  );
};
