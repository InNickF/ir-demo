import { PropertyOperationalStatementTable } from "@/commons/components/data-display/PropertyOperationalStatementTable";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { OperationalStatementTableMetricsType } from "@/modules/assets/typings/property";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface PropertyOperationalStatementProps {
  className?: string;
  metrics: OperationalStatementTableMetricsType[];
  isLoading?: boolean;
  isRefetching?: boolean;
}

export const PropertyOperationalStatement: FC<
  PropertyOperationalStatementProps
> = ({ className, metrics = [], isLoading, isRefetching }) => {
  const prefix = "asset-operational-statement-card";

  const getClasses = () => {
    const classes = [prefix, "mt-4"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader
      className={getClasses()}
      title="Financial Statement"
      icon={<CalculatorIcon />}
      bodyPadding={false}
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      <PropertyOperationalStatementTable
        metrics={metrics}
        activeComparison="Budget"
      />
    </CardWithHeader>
  );
};
