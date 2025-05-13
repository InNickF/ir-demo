import { InputDatePicker } from "@/commons/components/data-entry/InputDatePicker";
import { transformDateToDatePicker } from "@/commons/components/data-entry/InputDatePicker/utils";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { ExtendedDealInformation } from "@/modules/acquisitions/typings/deals";
import { FC, useEffect, useRef } from "react";
import { RegisterOptions } from "react-hook-form";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";
import { datePattern } from "@/commons/utils/input-validations";
import "./styles.css";

interface GenericQuickDealDateFormProps
  extends Omit<QuickDealsFormProps, "children"> {
  name: keyof ExtendedDealInformation;
  placeholder?: string;
  className?: string;
  registerOptions?: RegisterOptions;
}
export const GenericQuickDealDateForm: FC<GenericQuickDealDateFormProps> = ({
  name,
  placeholder,
  className,
  registerOptions,
  ...props
}) => {
  const prefix = "acq-deals-generic-quick-date-form";
  const getClasses = () => {
    const classes = [`${prefix}__input`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const input = useRef<HTMLInputElement>(null);

  useEffect(function focusOnlyOnMount() {
    input.current?.focus();
  }, []);

  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        return (
          <>
            <InputDatePicker
              placeholder={placeholder}
              className={getClasses()}
              error={form.formState.errors[name]?.message}
              defaultValue={transformDateToDatePicker({
                value: form.getValues(name) as string,
              })}
              {...form.register(name, {
                onChange: (event) => {
                  if (event?.target?.value) {
                    form.setValue(
                      name,
                      transformInputDateToMMDDYYYY(event.target.value)
                    );
                  }
                },
                pattern: datePattern(),
                ...registerOptions,
              })}
            />
          </>
        );
      }}
    </QuickDealsForm>
  );
};
