import {
  PurchasePriceSFInput,
  PurchasePriceSFInputProps,
} from "@/acquisitions/components/data-entry/DealInformationFormInputs/components/PurchasePriceSFInput";
import { FC } from "react";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";

interface PurchasePriceSFFormProps
  extends Omit<QuickDealsFormProps, "children">,
    Omit<
      PurchasePriceSFInputProps,
      "onError" | "register" | "getValues" | "setValue"
    > {}

export const PurchasePriceSFDealForm: FC<PurchasePriceSFFormProps> = ({
  dealId,
  defaultValues,
  onCancel,
  onSuccess,
  onError,
  onSettled,
  deal,
  ...inputProps
}) => {
  return (
    <QuickDealsForm
      dealId={dealId}
      defaultValues={defaultValues}
      onCancel={onCancel}
      onSuccess={onSuccess}
      onError={onError}
      onSettled={onSettled}
      deal={deal}
    >
      {({ form }) => {
        return (
          <PurchasePriceSFInput
            {...inputProps}
            register={form.register}
            setValue={form.setValue}
            getValues={form.getValues}
            error={
              form?.formState?.errors?.[inputProps?.is || "purchase_price"]
                ?.message
            }
          />
        );
      }}
    </QuickDealsForm>
  );
};
