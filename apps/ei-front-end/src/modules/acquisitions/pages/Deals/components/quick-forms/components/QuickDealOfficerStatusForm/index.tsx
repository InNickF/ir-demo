import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { OfficerStatusSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/OfficerStatusSelect";
import { DealOfficerStatusSchema } from "@/modules/acquisitions/schemas/deals";
import { FC } from "react";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";

export const QuickDealOfficerStatusForm: FC<
  Omit<QuickDealsFormProps, "children">
> = (props) => {
  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        return (
          <OfficerStatusSelect
            identifier="officer_status"
            control={form.control}
            defaultValue={props?.defaultValues?.officer_status}
            onChange={(
              option: GenericLabelValueObject<typeof DealOfficerStatusSchema>
            ) => {
              form.setValue("officer_status", option);
            }}
            rules={{
              required: required("officer_status"),
            }}
            error={form.formState.errors["officer_status"]?.message}
          />
        );
      }}
    </QuickDealsForm>
  );
};
