import { getDealBasicInformationInputs } from "@/acquisitions/components/data-entry/DealInformationFormInputs";
import { getBasicDealInformationWithSpecs } from "@/acquisitions/components/data-entry/DealInformationFormInputs/inputs/deal-basic-information-with-specs";
import { ScreeningDealInformation } from "@/acquisitions/typings/deals";
import { Stepper } from "in-ui-react";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { GenericStepContentActions } from "../../../types";
import { StepFooter } from "../../StepFooter";

export const DealInformationStep: FC<
  GenericStepContentActions<ScreeningDealInformation>
> = ({ current, onBack, onContinue }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ScreeningDealInformation>({
    mode: "all",
  });

  const inputs = useMemo(
    () => {
      const inputs = getBasicDealInformationWithSpecs({
        control,
        getValues,
        register,
        setValue,
      }).map((input) => {
        /* Adding styling to some specific inputs */
        if (
          input.key === "strategy" ||
          input.key === "comments" ||
          input.key === "dead_reason"
        ) {
          const { Component, props, key } = input;
          return {
            Component: Component,
            key,
            props: {
              ...props,
              className: "acq-default-form-grid__item--span-full",
            },
          };
        }

        if (input.key === "dead_reason_type") {
          const { Component, props, key } = input;
          return {
            Component: Component,
            key,
            props: {
              ...props,
              rules: null,
            },
          };
        }

        return input;
      }) as ReturnType<typeof getDealBasicInformationInputs>;
      reset();
      return inputs;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = (data) => {
    onContinue(data);
  };

  return (
    <Stepper.StepContent current={current} step={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="acq-default-form-grid">
          {inputs.map((input) => {
            const { Component, props, key } = input;
            return (
              <Component
                key={key}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(props as any)}
                error={errors?.[key]?.message}
              />
            );
          })}
        </div>
        <StepFooter
          type="submit"
          current={current}
          onBack={onBack}
          onContinue={() => null}
        />
      </form>
    </Stepper.StepContent>
  );
};
