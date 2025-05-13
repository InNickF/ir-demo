import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { FC } from "react";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";
import { BrokerSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/BrokerSelect";

export const QuickDealBrokerCompanyForm: FC<
  Omit<QuickDealsFormProps, "children">
> = (props) => {
  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        return (
          <BrokerSelect
            identifier="broker_company"
            control={form.control}
            defaultValue={props?.defaultValues?.broker_company}
            onChange={(option: GenericLabelValueObject) => {
              form.setValue("broker_company", option);
            }}
            rules={{
              required: required("Broker Company"),
            }}
            error={form.formState.errors["broker_company"]?.message}
          />
        );
      }}
    </QuickDealsForm>
  );
};
