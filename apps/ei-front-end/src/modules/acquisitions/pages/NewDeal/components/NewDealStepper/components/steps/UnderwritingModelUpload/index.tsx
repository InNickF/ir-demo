import { StepFooter } from "@/acquisitions/pages/NewDeal/components/NewDealStepper/components/StepFooter";

import { DealUnderwritingModel } from "@/acquisitions/typings/deals";
import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { Heading, Stepper } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { GenericStepContentActions } from "../../../types";
import { required } from "@/commons/utils/input-validations";

export const UnderwritingModelUploadStep: FC<
  GenericStepContentActions<DealUnderwritingModel>
> = ({ current, onBack, onContinue }) => {
  const {
    handleSubmit,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<DealUnderwritingModel>({
    defaultValues: { file: null },
  });

  const updateBackOfTheNapkin = (data: DealUnderwritingModel) => {
    onContinue(data);
  };

  return (
    <Stepper.StepContent step={2} current={current}>
      <div className="flex flex-col items-start justify-between pb-4 md:flex-row md:items-center">
        <Heading kind="h3">Upload Underwriting Model</Heading>
      </div>
      <form onSubmit={handleSubmit(updateBackOfTheNapkin)}>
        <div className="mx-auto max-w-[500px]">
          <GenericControlledDropzone
            control={control}
            identifier="file"
            onRemove={() => setValue("file", null)}
            showTags
            rules={{ required: required("A file") }}
            options={{
              accept: { "application/vnd.ms-excel": [".xlsb"] },
            }}
            error={errors?.file?.message as string}
            onChange={(file: File[]) => {
              setValue("file", file[0]);
              errors?.file?.message && clearErrors("file");
            }}
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
