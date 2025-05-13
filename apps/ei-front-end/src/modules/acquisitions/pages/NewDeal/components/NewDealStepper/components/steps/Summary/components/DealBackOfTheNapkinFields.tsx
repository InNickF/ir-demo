import { dealBackOfNapkinKeysOrder } from "@/acquisitions/components/data-entry/DealBackOfTheNapkinFields";
import { DealBackOfTheNapkinInformation } from "@/acquisitions/typings/deals";
import {
  defaultScreeningFieldsFormatters,
  IDefaultDealFieldsFormatter,
} from "@/modules/acquisitions/utils/formatters/default-screening-fields-formatters";
import { FC, useMemo } from "react";
import { FieldBlock } from "./FieldBlock";

export const DealBackOfTheNapkinFields: FC<{
  inputs: DealBackOfTheNapkinInformation;
  formatters?: Array<
    IDefaultDealFieldsFormatter<DealBackOfTheNapkinInformation>
  >;
}> = ({ inputs, formatters = defaultScreeningFieldsFormatters }) => {
  const memoOrganizedInputs = useMemo(() => {
    const organizedInputs: Record<string, string | number> = {};
    dealBackOfNapkinKeysOrder.forEach((key) => {
      organizedInputs[key] = inputs[key] || "";
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
    </div>
  );
};
