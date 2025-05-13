import { DealBackOfNapkinFields } from "@/acquisitions/components/data-entry/DealBackOfTheNapkinFields";
import { BaseValues } from "@/acquisitions/components/data-entry/DealBackOfTheNapkinFields/components/BaseValues";
import { StepFooter } from "@/acquisitions/pages/NewDeal/components/NewDealStepper/components/StepFooter";

import {
  DealBackOfTheNapkinInformation,
  ScreeningDealInformation,
} from "@/acquisitions/typings/deals";
import { backOfTheNapkinDefaultValues } from "@/acquisitions/utils";
import { Heading, Stepper } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { GenericStepContentActions } from "../../../types";

interface BackOfTheNapkinStepProps
  extends GenericStepContentActions<DealBackOfTheNapkinInformation> {
  deal: ScreeningDealInformation;
}
export const BackOfTheNapkinStep: FC<BackOfTheNapkinStepProps> = ({
  deal,
  current,
  onBack,
  onContinue,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm<DealBackOfTheNapkinInformation>({
    defaultValues: { ...backOfTheNapkinDefaultValues },
  });

  const updateBackOfTheNapkin = (data) => {
    onContinue(data);
  };

  return (
    <Stepper.StepContent step={2} current={current}>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <Heading kind="h3">Back of the napkin (Optional)</Heading>
        <BaseValues
          purchasePrice={deal.purchase_price}
          sf={deal.sf}
          psf={deal.psf}
          className="mt-4 md:mt-0"
        />
      </div>
      <form onSubmit={handleSubmit(updateBackOfTheNapkin)}>
        <div>
          <DealBackOfNapkinFields
            purchasePrice={deal.purchase_price}
            sf={deal.sf}
            psf={deal.psf}
            control={control}
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
            watch={watch}
          />
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
