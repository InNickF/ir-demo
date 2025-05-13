import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { DealTypeSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/DealTypeSelect";
import { FC } from "react";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";
import { DealValueAddTypeSchema } from "@/modules/acquisitions/schemas/deals";

export const QuickDealTypeForm: FC<Omit<QuickDealsFormProps, "children">> = (
  props
) => {
  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        return (
          <DealTypeSelect
            identifier="type"
            control={form.control}
            defaultValue={props?.defaultValues?.type}
            onChange={(
              option: GenericLabelValueObject<typeof DealValueAddTypeSchema>
            ) => {
              form.setValue("type", option);
            }}
            rules={{
              required: required("Type"),
            }}
            error={form.formState.errors["type"]?.message}
          />
        );
      }}
    </QuickDealsForm>
  );
};
