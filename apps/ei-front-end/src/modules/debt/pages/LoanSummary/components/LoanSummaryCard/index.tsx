import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericLabelValueObject } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import {
  DebtLoanContentKeys,
  DebtLoanSummaryDetail,
} from "@/modules/debt/typings/loans";
import { loanContentDetailFormatter } from "@/modules/debt/utils/formatters/loan-summary-formatters";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { FC, useMemo } from "react";
import { loanInterestRateInformationKeysOrder } from "../../utils";

interface LoanSummaryCardProps {
  metrics: DebtLoanSummaryDetail;
  searchQuery: string;
  className?: string;
}

export const LoanSummaryCard: FC<LoanSummaryCardProps> = ({
  metrics,
  searchQuery,
  className,
}) => {
  const simpleGridMetrics = useMemo(() => {
    return metrics?.content?.map(({ key, label, value }) => {
      if (typeof value !== "string" && typeof value !== "number") {
        // Handle the case where value is not a string or number
        value = ""; // or any default value you prefer
      }
      return {
        label: convertToTitleCase(label),
        value: loanContentDetailFormatter.format({ key, value }).value,
      };
    }) as GenericLabelValueObject[];
  }, [metrics]);

  const orderedGridMetrics = useMemo(() => {
    if (metrics?.key === "interest_rate_information") {
      return simpleGridMetrics.sort((a, b) => {
        return (
          loanInterestRateInformationKeysOrder.indexOf(
            a.label as keyof DebtLoanContentKeys
          ) -
          loanInterestRateInformationKeysOrder.indexOf(
            b.label as keyof DebtLoanContentKeys
          )
        );
      });
    }
    return simpleGridMetrics;
  }, [metrics, simpleGridMetrics]);

  return (
    <CardWithHeader
      className={className}
      title={humanizeSnakeCase(metrics?.key)}
      icon={<BuildingOffice2Icon />}
      bodyPadding={false}
    >
      <SimpleLabelValueGrid
        items={orderedGridMetrics}
        searchQuery={searchQuery}
      />
    </CardWithHeader>
  );
};
