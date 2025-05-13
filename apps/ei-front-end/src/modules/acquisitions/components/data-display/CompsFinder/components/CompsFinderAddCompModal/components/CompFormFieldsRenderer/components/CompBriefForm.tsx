import { CompstackCompType } from "@/modules/acquisitions/typings/market-analytics";
import { compstackCompInputPrefix } from "../../../utils/form-fields";
import { CompBriefAndFullFormProps } from "../types";
import { getCompstackManualCompsBriefForm } from "@/modules/acquisitions/utils/compstack-comps";

export const CompBriefForm = <T extends CompstackCompType>({
  fields,
  formState,
  isFullForm,
  compType,
}: CompBriefAndFullFormProps<T>) => {
  const briefFormOrderedKeys = getCompstackManualCompsBriefForm(compType);

  return (
    <div className={`${compstackCompInputPrefix}__section`}>
      <div className={`${compstackCompInputPrefix}__inputs-grid`}>
        {briefFormOrderedKeys.map((key) => {
          const field = fields.find((f) => f.key === key);
          return <>{field?.render({ state: formState, isFullForm })}</>;
        })}
      </div>
    </div>
  );
};
