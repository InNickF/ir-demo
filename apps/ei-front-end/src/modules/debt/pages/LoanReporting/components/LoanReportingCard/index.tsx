import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { DebtLoanReportingDetail } from "@/modules/debt/typings/loans";
import { FlagIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "in-ui-react";
import { FC, useState } from "react";
import { LoanReportingTable } from "../LoanReportingTable";
import "./styles.css";

export interface LoanReportingCardProps {
  metrics: DebtLoanReportingDetail;
  searchQuery?: string;
  className?: string;
}

export const LoanReportingCard: FC<LoanReportingCardProps> = ({
  metrics,
  searchQuery,
  className,
}) => {
  const [showEmptyValues, setShowEmptyValues] = useState(false);

  const prefix = "debt-loan-reporting-card";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const filteredReport = {
    ...metrics,
    content: metrics?.content
      ?.map(({ key, content }) => {
        const filteredContent = content?.some((metric) => {
          if (showEmptyValues) return true;

          return (
            metric.value !== null &&
            metric.value !== false &&
            metric.value !== ""
          );
        });

        return {
          key,
          content: filteredContent ? content : null,
        };
      })
      .filter(({ content }) => content !== null),
  };

  return (
    <CardWithHeader
      className={getClasses()}
      title={humanizeSnakeCase(metrics.key)}
      icon={<FlagIcon />}
      bodyPadding={false}
      headerActions={
        <Checkbox
          onChange={() => setShowEmptyValues(!showEmptyValues)}
          checked={showEmptyValues}
          label="Show hidden rows"
          id={metrics.key}
          tooltip="Show rows where all columns contain 'N/A' or 'No'."
        />
      }
    >
      <LoanReportingTable metrics={filteredReport} searchQuery={searchQuery} />
    </CardWithHeader>
  );
};
