import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericLabelValueObject } from "@/commons/typings";
import { booleanToYesNoString } from "@/commons/model-in/formatters/utils";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { LoanCovenantTestingTable } from "@/modules/debt/pages/LoanCovenantTesting/components/LoanCovenantTestingTable";
import { DebtLoanCovenantTestingDetail } from "@/modules/debt/typings/loans";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { FC, useMemo } from "react";
import "./styles.css";

interface LoanCovenantTestingCardProps {
  metrics: DebtLoanCovenantTestingDetail;
  searchQuery: string;
  className?: string;
}

export const LoanCovenantTestingCard: FC<LoanCovenantTestingCardProps> = ({
  metrics,
  searchQuery,
  className,
}) => {
  const prefix = "debt-loan-metrics-card";

  const getClasses = () => {
    const classes = [`${prefix}`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const simpleGridMetrics = useMemo(() => {
    return metrics?.content?.map(({ label, value }) => {
      return {
        label: convertToTitleCase(label),
        value: booleanToYesNoString({ value }),
      };
    }) as GenericLabelValueObject[];
  }, [metrics]);

  const isTable = metrics?.columns?.length > 0;

  const definition =
    metrics?.definition && (metrics?.definition[0]?.value as string);

  return (
    <CardWithHeader
      className={getClasses()}
      title={humanizeSnakeCase(metrics.key)}
      icon={<BuildingOfficeIcon />}
      bodyPadding={false}
    >
      {isTable ? (
        <LoanCovenantTestingTable metrics={metrics} definition={definition} />
      ) : (
        <SimpleLabelValueGrid
          items={simpleGridMetrics}
          searchQuery={searchQuery}
        />
      )}
    </CardWithHeader>
  );
};
