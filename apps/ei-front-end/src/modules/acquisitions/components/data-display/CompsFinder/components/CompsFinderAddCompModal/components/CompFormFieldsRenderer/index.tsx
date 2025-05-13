import {
  CompstackCompKeysPayloadByType,
  CompstackCompType,
} from "@/modules/acquisitions/typings/market-analytics";
import { UseFormReturn } from "react-hook-form";

import { CompstackCompFormFieldRenderer } from "../../types";
import { compstackCompInputPrefix } from "../../utils/form-fields";
import { CompBriefForm } from "./components/CompBriefForm";
import { CompFullForm } from "./components/FullForm";
import { ShowAllFieldsButton } from "./components/ShowAllFieldsButton";

interface CompFormFieldsRendererProps<T extends CompstackCompType> {
  isFullForm: boolean;
  onFullFormMode: () => void;
  formFields: CompstackCompFormFieldRenderer<T>[];
  formState?: UseFormReturn<CompstackCompKeysPayloadByType[T]>;
  compType: T;
}

export const CompFormFieldsRenderer = <T extends CompstackCompType>({
  isFullForm,
  onFullFormMode,
  formFields,
  formState,
  compType,
}: CompFormFieldsRendererProps<T>) => {
  return (
    <div className={`${compstackCompInputPrefix}__wrapper`}>
      {isFullForm ? (
        <CompFullForm
          fields={formFields}
          formState={formState}
          compType={compType}
          isFullForm={isFullForm}
        />
      ) : (
        <CompBriefForm
          fields={formFields}
          formState={formState}
          compType={compType}
          isFullForm={isFullForm}
        />
      )}
      <ShowAllFieldsButton isFullForm={isFullForm} onClick={onFullFormMode} />
    </div>
  );
};
