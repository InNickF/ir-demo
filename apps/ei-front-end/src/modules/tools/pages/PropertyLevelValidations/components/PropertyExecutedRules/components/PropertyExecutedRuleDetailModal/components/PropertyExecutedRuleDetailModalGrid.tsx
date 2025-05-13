import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import { PropertyRuleDetail } from "@/modules/tools/typings/property-level-validations";
import { FC } from "react";
import "../styles.css";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";

export const PropertyExecutedRuleDetailModalGrid: FC<{
  ruleDetails: PropertyRuleDetail[];
  className?: string;
}> = ({ ruleDetails, className }) => {
  const prefix = "tools-property-executed-rule-detail-modal-grid";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const ruleDetailsFormatted = Object.entries(ruleDetails?.[0] ?? {}).map(
    ([key, value]) => ({
      label: humanizeSnakeCase(key),
      value: String(value),
    })
  );

  return (
    <SimpleLabelValueGrid
      className={getClasses()}
      kind="small"
      items={ruleDetailsFormatted}
    />
  );
};
