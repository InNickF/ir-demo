import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { OperationalFinancialPerformanceComparison } from "@/modules/assets/typings/operational-financial-performance";
import { OperationalFinancialPerformanceTableMetrics } from "@/modules/assets/typings/operational-financial-performance";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { ButtonGroup } from "in-ui-react";
import { FC } from "react";
import { OFPSelectedMetric, OFPTableButtonFilters } from "../../types";
import { PropertyPerformanceMetricsTable } from "./components/PropertyPerformanceMetricsTable";
import "./styles.css";

interface OperationalFinancialPerformanceMetricsTableProps
  extends IsLoadingProp,
    IsRefetchingProp,
    OFPTableButtonFilters,
    OFPSelectedMetric {
  title?: string;
  className?: string;
  data: OperationalFinancialPerformanceTableMetrics[];
  onSelectMetric: (metric: string) => void;
  activeComparison: OperationalFinancialPerformanceComparison;
}

export const OperationalFinancialPerformanceMetricsTable: FC<
  OperationalFinancialPerformanceMetricsTableProps
> = ({
  className,
  data = [],
  activeComparison,
  comparisonButtonsFilters,
  onSelectMetric,
  selectedMetric,
  isLoading,
  isRefetching,
  title = "Operational Performance",
}) => {
  const prefix = "assets-property-performance-table-card";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const TableHeaderActions = () => {
    return (
      <div className={`${prefix}--header-actions`}>
        <span className={`${prefix}--header-actions__text`}>Compare vs:</span>
        <ButtonGroup
          items={comparisonButtonsFilters}
          active={activeComparison}
        />
      </div>
    );
  };

  return (
    <CardWithHeader
      className={getClasses()}
      title={title}
      icon={<BookOpenIcon />}
      headerActions={<TableHeaderActions />}
      bodyPadding={false}
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      <PropertyPerformanceMetricsTable
        data={data}
        activeComparison={activeComparison}
        selectedMetric={selectedMetric}
        isLoading={isLoading}
        onSelectMetric={onSelectMetric}
      />
    </CardWithHeader>
  );
};
