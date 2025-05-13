/* eslint-disable @typescript-eslint/no-unused-vars */
import { GenericFormRenderFunctionProps } from "@/commons/typings/forms";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { Input, InputProps } from "in-ui-react";
import { FC } from "react";
import { RegisterOptions } from "react-hook-form";

interface CommonDatePickerProps
  extends GenericFormRenderFunctionProps<Deal>,
    Omit<InputProps, "name"> {
  registerOptions?: RegisterOptions;
  name: keyof Deal;
}
export const CommonInput: FC<CommonDatePickerProps> = ({
  state,
  name,
  isFullForm,
  HTMLAttributes,
  registerOptions,
  ...props
}) => {
  return (
    <>
      <Input
        {...state.register(name, registerOptions)}
        {...props}
        error={state.formState.errors[name]?.message}
      />
    </>
  );
};
