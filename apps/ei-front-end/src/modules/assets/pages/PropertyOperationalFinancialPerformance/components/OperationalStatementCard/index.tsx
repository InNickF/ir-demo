import { PropertyOperationalStatementTable } from "@/commons/components/data-display/PropertyOperationalStatementTable";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { TableCard } from "@/commons/components/general/TableCard";
import { usePropertyIdFromQueryParams } from "@/modules/assets/hooks/usePropertyIdFromQueryParams";
import { useGetOperationalStatement } from "@/modules/assets/services/queries/properties";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import { FiltersPayloadType } from "in-ui-react";
import { FC } from "react";

interface PropertyPerformanceTableProps {
  className?: string;
  filteredOptions?: FiltersPayloadType;
  activeComparison: string;
}

export const OperationalStatementCard: FC<PropertyPerformanceTableProps> = ({
  className,
  filteredOptions,
  activeComparison,
}) => {
  const prefix = "asset-operational-statement-card";
  const propertyId = usePropertyIdFromQueryParams();

  const getClasses = () => {
    const classes = [prefix, "mt-4"];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { data, isLoading, isRefetching } = useGetOperationalStatement({
    filters: {
      ...filteredOptions,
      yardi_property_code: propertyId,
    },
  });

  return (
    <CardWithHeader
      className={getClasses()}
      title="Operational Statement"
      icon={<CalculatorIcon />}
      bodyPadding={false}
      isLoading={isLoading}
      isRefetching={isRefetching}
      loaderKind="chart"
    >
      <TableCard.Body>
        <PropertyOperationalStatementTable
          metrics={data}
          activeComparison={activeComparison}
        />
      </TableCard.Body>
    </CardWithHeader>
  );
};
