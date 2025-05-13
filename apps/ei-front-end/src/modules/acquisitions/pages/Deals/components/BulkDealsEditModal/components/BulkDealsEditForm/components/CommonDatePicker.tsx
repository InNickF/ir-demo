/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  InputDatePicker,
  InputDatePickerProps,
} from "@/commons/components/data-entry/InputDatePicker";
import { GenericFormRenderFunctionProps } from "@/commons/typings/forms";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { datePattern } from "@/commons/utils/input-validations";
import { Deal } from "@/modules/acquisitions/typings/deals";

interface CommonDatePickerProps
  extends GenericFormRenderFunctionProps<Deal>,
    InputDatePickerProps {
  name: keyof Deal;
}

export const CommonDatePicker = ({
  state,
  HTMLAttributes,
  isFullForm,
  name,
  ...props
}: CommonDatePickerProps) => {
  return (
    <InputDatePicker
      {...props}
      error={state.formState.errors[name]?.message}
      value={state.getValues(name) as string}
      {...state.register(name, {
        onChange: (event) => {
          if (event?.target?.value) {
            state.setValue(
              name,
              transformInputDateToMMDDYYYY(event.target.value)
            );
          }
        },
        pattern: datePattern(),
      })}
    />
  );
};
