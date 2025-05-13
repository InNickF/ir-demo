import { useDebounce } from "@/commons/hooks/useDebounce";
import { IsLoadingProp } from "@/commons/typings";
import { Button, FiltersPayloadType, Input, InputProps } from "in-ui-react";
import { ChangeEvent, FC, useCallback, useState } from "react";

interface FromToInputsProps
  extends IsLoadingProp,
    Omit<InputProps, "loading" | "label" | "value" | "onChange"> {
  filteredOptions: FiltersPayloadType;
  onApply: (payload: FiltersPayloadType) => void;
  accessor: string;
  fromName: string;
  toName: string;
  onClear?: () => void;
  showApplyButton?: boolean;
}

export const FromToInputs: FC<FromToInputsProps> = ({
  filteredOptions,
  onApply,
  isLoading,
  accessor,
  fromName,
  toName,
  showApplyButton = false,
  onClear,
  ...props
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (!showApplyButton) {
      applyChanges();
    }
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

  return (
    <>
      <div className="flex flex-col gap-2 p-2">
        <Input
          label="From"
          color="over-ghost"
          name={fromName}
          value={values?.[fromName]}
          loading={isLoading}
          onChange={onChange}
          {...props}
        />
        <Input
          label="To"
          name={toName}
          color="over-ghost"
          value={values?.[toName]}
          loading={isLoading}
          onChange={onChange}
          {...props}
        />
      </div>
      <div className="pt-3">
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
