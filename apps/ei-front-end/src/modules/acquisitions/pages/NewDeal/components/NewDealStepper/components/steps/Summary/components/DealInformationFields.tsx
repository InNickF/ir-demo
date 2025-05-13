import { ScreeningDealInformation } from "@/acquisitions/typings/deals";
import {
  defaultScreeningFieldsFormatters,
  IDefaultDealFieldsFormatter,
} from "@/modules/acquisitions/utils/formatters/default-screening-fields-formatters";
import { GenericLabelValueObject } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { basicDealInformationWithSpecsKeysOrder } from "@/acquisitions/components/data-entry/DealInformationFormInputs/inputs/deal-basic-information-with-specs";
import { FC, useMemo } from "react";
import { FieldBlock } from "./FieldBlock";

export const DealInformationFields: FC<{
  inputs: ScreeningDealInformation;
  formatters?: Array<IDefaultDealFieldsFormatter<ScreeningDealInformation>>;
}> = ({ inputs, formatters = defaultScreeningFieldsFormatters }) => {
  const memoOrganizedInputs = useMemo(() => {
    const organizedInputs: Record<
      string,
      string | number | GenericLabelValueObject
    > = {};

    basicDealInformationWithSpecsKeysOrder.forEach((key) => {
      const value = inputs[key] as string | number | GenericLabelValueObject;
      organizedInputs[key] = value || "";
    });
    return organizedInputs;
  }, [inputs]);

  return (
    <div className="gap-4 acq-default-form-grid">
      {Object.entries(memoOrganizedInputs).map(([label, value]) => {
        if (label !== "comments" && label !== "strategy") {
          const formattedField = formatters
            .find(({ key }) => {
              return key === label;
            })
            ?.formatter(value);

          return (
            <FieldBlock
              key={label}
              label={label}
              value={formattedField || value}
            />
          );
        }
      })}
      <FieldBlock
        label="Deal Summary"
        value={genericGetValue(inputs.strategy, true)}
      />
      <FieldBlock
        label="Specs and Notes"
        value={genericGetValue(inputs.comments, true)}
      />
    </div>
  );
};
