import { Empty, Table } from "in-ui-react";
import { FC } from "react";

interface LoansTableEmptyRowProps {
  colSpan?: number;
  className?: string;
}

export const LoansTableEmptyRow: FC<LoansTableEmptyRowProps> = ({
  colSpan = 17,
  className,
}) => {
  const prefix = "debt-loans-table-empty-row";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Table.Row>
      <Table.Data colSpan={colSpan} className={getClasses()}>
        <Empty />
      </Table.Data>
    </Table.Row>
  );
};
