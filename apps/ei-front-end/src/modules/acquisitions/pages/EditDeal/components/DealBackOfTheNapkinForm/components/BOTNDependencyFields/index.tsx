import { ScreeningDealInformation } from "@/acquisitions/typings/deals";
import { getDealBasicInformationInputs } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs";
import { FC, useMemo } from "react";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { DealBackOfNapkinFormAndDependencyInputs } from "../..";
import "./styles.css";

interface BOTNDependencyFieldsProps<
  T extends Pick<ScreeningDealInformation, "purchase_price" | "sf" | "psf">
> {
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  errors: Merge<FieldError, FieldErrorsImpl<T>>;
  reset: UseFormReset<T>;
}
const dependencyInputKeys: (keyof ScreeningDealInformation)[] = [
  "purchase_price",
  "sf",
  "psf",
];

export const BOTNDependencyFields: FC<
  BOTNDependencyFieldsProps<DealBackOfNapkinFormAndDependencyInputs>
> = ({ control, errors, getValues, register, setValue, reset }) => {
  const inputs = useMemo(() => {
    const fields = getDealBasicInformationInputs({
      control,
      getValues,
      register,
      setValue,
    }).filter(({ key }) => {
      return dependencyInputKeys.includes(key);
    });
    reset();
    return fields;
  }, [control, getValues, register, setValue, reset]);

  return (
    <section className="botn-dependencies-grid">
      {inputs.map((input) => {
        const { Component, props, key } = input;
        return (
          <Component
            key={key}
            className="botn-dependencies-inputs"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(props as any)}
            error={errors?.[key]?.message}
          />
        );
      })}
    </section>
  );
};
