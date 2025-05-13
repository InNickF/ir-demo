import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { OfficerSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/OfficerSelect";
import { FC } from "react";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";

export const QuickDealOfficerForm: FC<Omit<QuickDealsFormProps, "children">> = (
  props
) => {
  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        return (
          <OfficerSelect
            identifier="officer"
            control={form.control}
            defaultValue={props?.defaultValues?.officer}
            onChange={(option: GenericLabelValueObject) => {
              form.setValue("officer", option);
            }}
            rules={{
              required: required("Officer"),
            }}
            error={form.formState.errors["officer"]?.message}
          />
        );
      }}
    </QuickDealsForm>
  );
};
