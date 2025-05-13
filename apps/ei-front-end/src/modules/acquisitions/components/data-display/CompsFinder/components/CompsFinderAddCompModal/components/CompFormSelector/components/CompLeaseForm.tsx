import { useCreateLeaseComp } from "@/modules/acquisitions/services/mutations/market-analytics";
import { FC } from "react";
import { compstackCompLeaseForm } from "../../../utils/form-fields";
import { CompFormFieldsRenderer } from "../../CompFormFieldsRenderer";
import { GenericCompstackCompForm } from "../../GenericCompstackCompForm";
import { CommonCompFormProps } from "../types";

export const CompLeaseForm: FC<CommonCompFormProps> = ({
  isFullForm,
  onFullFormMode,
  ...props
}) => {
  return (
    <GenericCompstackCompForm
      compType="lease"
      useMutation={useCreateLeaseComp}
      rhfProps={{
        mode: "all" as const,
        defaultValues: {
          lease_type: "NNN",
          transaction_type: "New Lease",
        },
      }}
      {...props}
    >
      <CompFormFieldsRenderer
        formFields={compstackCompLeaseForm}
        compType="lease"
        isFullForm={isFullForm}
        onFullFormMode={onFullFormMode}
      />
    </GenericCompstackCompForm>
  );
};
