import { useDebounce } from "@/commons/hooks/useDebounce";
import { IsLoadingProp } from "@/commons/typings";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { Button, FiltersPayloadType } from "in-ui-react";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { InputDatePicker } from "../InputDatePicker";
import "./styles.css";
interface FromToDateInputsProps extends IsLoadingProp {
  filteredOptions: FiltersPayloadType;
  fromName?: string;
  toName?: string;
  accessor?: string;
  showApplyButton?: boolean;
  className?: string;
  onClear?: () => void;
  onApply: (payload: FiltersPayloadType) => void;
}

export const FromToDateInputs: FC<FromToDateInputsProps> = ({
  filteredOptions,
  onApply,
  isLoading,
  fromName = "from_date",
  toName = "to_date",
  accessor = "date",
  showApplyButton = false,
  className,
  onClear,
}) => {
  const prefix = "commons-from-to-date-inputs-component";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const [values, setValues] = useState({
    [fromName]: filteredOptions[accessor]?.[fromName] || "",
    [toName]: filteredOptions[accessor]?.[toName] || "",
  });

  const applyChanges = useCallback(() => {
    const fromValue = values?.[fromName]
      ? { [fromName]: transformInputDateToMMDDYYYY(values?.[fromName]) }
      : {};

    const toValue = values?.[toName]
      ? { [toName]: transformInputDateToMMDDYYYY(values?.[toName]) }
      : {};

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
      <div className={getClasses()}>
        <InputDatePicker
          className={`${prefix}--input`}
          label="From"
          color="over-ghost"
          name={fromName}
          value={values?.[fromName]}
          loading={isLoading}
          onChange={onChange}
        />
        <InputDatePicker
          className={`${prefix}--input`}
          label="To"
          name={toName}
          color="over-ghost"
          value={values?.[toName]}
          loading={isLoading}
          onChange={onChange}
        />
      </div>
      <div className={`${prefix}--actions-section`}>
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
