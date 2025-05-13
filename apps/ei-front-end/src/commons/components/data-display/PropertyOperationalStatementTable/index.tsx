import { OperationalStatementTableMetricsType } from "@/modules/assets/typings/property";
import { Table } from "in-ui-react";
import { FC } from "react";
import { OperationalStatementTableHead } from "./components/OperationalStatementTableHead";
import { OperationalStatementTableRow } from "./components/OperationalStatementTableRow";

interface PropertyOperationalStatementTableProps {
  className?: string;
  metrics: OperationalStatementTableMetricsType[];
  activeComparison?: string;
}

export const PropertyOperationalStatementTable: FC<
  PropertyOperationalStatementTableProps
> = ({ className, metrics, activeComparison = "Reference" }) => {
  const prefix = "commons-operational-statement-table";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Table className={getClasses()}>
      <OperationalStatementTableHead activeComparison={activeComparison} />
      <Table.Body>
        {metrics?.map((rowMetrics, index) => (
          <OperationalStatementTableRow key={index} metrics={rowMetrics} />
        ))}
      </Table.Body>
    </Table>
  );
};
