import { useCreateSaleComp } from "@/modules/acquisitions/services/mutations/market-analytics";
import { GenericCompstackCompForm } from "../../GenericCompstackCompForm";
import { CompFormFieldsRenderer } from "../../CompFormFieldsRenderer";
import { compstackCompSaleForm } from "../../../utils/form-fields";
import { CommonCompFormProps } from "../types";
import { FC } from "react";

export const CompSaleForm: FC<CommonCompFormProps> = ({
  isFullForm,
  onFullFormMode,
  ...props
}) => {
  return (
    <GenericCompstackCompForm
      compType="sale"
      useMutation={useCreateSaleComp}
      rhfProps={{
        mode: "all" as const,
        defaultValues: {
          is_part_of_multi_property: false,
          is_part_of_portfolio: false,
        },
      }}
      {...props}
    >
      <CompFormFieldsRenderer
        formFields={compstackCompSaleForm}
        compType="sale"
        isFullForm={isFullForm}
        onFullFormMode={onFullFormMode}
      />
    </GenericCompstackCompForm>
  );
};
