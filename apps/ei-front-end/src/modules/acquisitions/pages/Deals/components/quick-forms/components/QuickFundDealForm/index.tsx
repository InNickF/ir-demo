import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { FundSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/FundSelect";
import { FC } from "react";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";

export const QuickFundDealForm: FC<Omit<QuickDealsFormProps, "children">> = (
  props
) => {
  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        return (
          <FundSelect
            identifier="fund"
            control={form.control}
            defaultValue={props?.defaultValues?.fund}
            onChange={(option: GenericLabelValueObject) => {
              form.setValue("fund", option);
            }}
            rules={{
              required: required("Fund"),
            }}
            error={form.formState.errors["fund"]?.message}
          />
        );
      }}
    </QuickDealsForm>
  );
};
