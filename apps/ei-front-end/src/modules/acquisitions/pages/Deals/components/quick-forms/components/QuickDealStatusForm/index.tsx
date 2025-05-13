import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { StatusSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/StatusSelect";
import { DealStatusSchema } from "@/modules/acquisitions/schemas/deals";
import { FC } from "react";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";

export const QuickDealStatusForm: FC<Omit<QuickDealsFormProps, "children">> = (
  props
) => {
  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        return (
          <StatusSelect
            identifier="status"
            control={form.control}
            defaultValue={props?.defaultValues?.status}
            onChange={(
              option: GenericLabelValueObject<typeof DealStatusSchema>
            ) => {
              form.setValue("status", option);
            }}
            rules={{
              required: required("Status"),
            }}
            error={form.formState.errors["status"]?.message}
          />
        );
      }}
    </QuickDealsForm>
  );
};
