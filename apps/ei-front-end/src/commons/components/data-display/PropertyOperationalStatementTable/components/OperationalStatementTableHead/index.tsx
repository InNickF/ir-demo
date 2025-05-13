import { Table } from "in-ui-react";
import { FC } from "react";
import { operationalStatementTableColumns } from "../../utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import "./styles.css";

interface OperationalStatementTableHeadProps {
  className?: string;
  activeComparison: string;
}
export const OperationalStatementTableHead: FC<
  OperationalStatementTableHeadProps
> = ({ className, activeComparison }) => {
  const prefix = "commons-operational-statement-table-head";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const tableColumnsWithActiveComparison = operationalStatementTableColumns.map(
    (column) => (column === "reference" ? activeComparison : column)
  );

  return (
    <Table.Head className={getClasses()}>
      <Table.Row>
        {tableColumnsWithActiveComparison.map((column) => (
          <Table.Header
            key={column}
            className={column !== "metric" ? `${prefix}--cell-right` : null}
          >
            {humanizeSnakeCase(column)}
          </Table.Header>
        ))}
      </Table.Row>
    </Table.Head>
  );
};
