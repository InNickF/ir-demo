import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { DealLawClosingProbabilitySchema } from "@/modules/acquisitions/schemas/deals";
import { FC } from "react";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";
import { ClosingProbabilitySelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/ClosingProbabilitySelect";

export const QuickDealClosingProbabilityForm: FC<
  Omit<QuickDealsFormProps, "children">
> = (props) => {
  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        return (
          <ClosingProbabilitySelect
            identifier="law_firm_closing_probability"
            control={form.control}
            defaultValue={props?.defaultValues?.status}
            onChange={(
              option: GenericLabelValueObject<
                typeof DealLawClosingProbabilitySchema
              >
            ) => {
              form.setValue("law_firm_closing_probability", option);
            }}
            rules={{
              required: required("Closing Probability"),
            }}
            error={
              form.formState.errors["law_firm_closing_probability"]?.message
            }
          />
        );
      }}
    </QuickDealsForm>
  );
};
