import { CompstackCompType } from "@/modules/acquisitions/typings/market-analytics";
import { getCompstackManualCompsFullForm } from "@/modules/acquisitions/utils/compstack-comps";
import { Heading } from "in-ui-react";
import { compstackCompInputPrefix } from "../../../utils/form-fields";
import { CompBriefAndFullFormProps } from "../types";

export const CompFullForm = <T extends CompstackCompType>({
  fields,
  formState,
  compType,
  isFullForm,
}: CompBriefAndFullFormProps<T>) => {
  const fullFormCategories = getCompstackManualCompsFullForm(compType);
  return (
    <div className={`${compstackCompInputPrefix}__section`}>
      {Object.keys(fullFormCategories).map((key) => {
        const fieldsByCategory = fullFormCategories[key];
        const categoryFields = fields.filter((field) =>
          fieldsByCategory.includes(field.key as never)
        );

        return (
          <div key={key} className={`${compstackCompInputPrefix}__section`}>
            <Heading kind="h4">{key}</Heading>
            <div className={`${compstackCompInputPrefix}__inputs-grid`}>
              {categoryFields.map((field) => (
                <>{field.render({ state: formState, isFullForm })}</>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
