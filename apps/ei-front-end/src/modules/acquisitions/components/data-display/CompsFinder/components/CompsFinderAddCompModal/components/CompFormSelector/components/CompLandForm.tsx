import { useCreateLandComp } from "@/modules/acquisitions/services/mutations/market-analytics";
import { FC } from "react";
import { compstackCompLandForm } from "../../../utils/form-fields";
import { CompFormFieldsRenderer } from "../../CompFormFieldsRenderer";
import { GenericCompstackCompForm } from "../../GenericCompstackCompForm";
import { CommonCompFormProps } from "../types";

export const CompLandForm: FC<CommonCompFormProps> = ({
  isFullForm,
  onFullFormMode,
  ...props
}) => {
  return (
    <GenericCompstackCompForm
      compType="land"
      useMutation={useCreateLandComp}
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
        formFields={compstackCompLandForm}
        compType="land"
        isFullForm={isFullForm}
        onFullFormMode={onFullFormMode}
      />
    </GenericCompstackCompForm>
  );
};
