import { GenericTableRowCols } from "@/commons/typings/tables";
import { FC } from "react";
import { DynamicTableData } from "./components/DynamicTableData";
import { DynamicTableRow } from "./components/DynamicTableRow";
import "./styles.css";

interface FinancialDynamicTableProps {
  data: GenericTableRowCols[];
  className?: string;
}

export const FinancialDynamicTable: FC<FinancialDynamicTableProps> = ({
  data = [],
  className,
}) => {
  const prefix = "deal-financial-dynamic-table";

  const getClasses = () => {
    const classes = [`${prefix}__wrapper`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const rows = data.map(({ key, label, cells, metadata }, index) => {
    return (
      <DynamicTableRow
        key={`${key}-${index}`}
        metadata={metadata}
        prefix={prefix}
      >
        {/* This label is the actual first element of the cell array but comes from the backend as a separated key */}
        {label && (
          <DynamicTableData
            value={label.value}
            metadata={label.metadata}
            prefix={prefix}
          />
        )}

        {cells?.map(({ metadata, value }, cellIndex) => (
          <DynamicTableData key={cellIndex} value={value} metadata={metadata} />
        ))}
      </DynamicTableRow>
    );
  });

  /* Group the rows by type (header, body, footer) to render rows with the correct parent table tag */
  const groupedRows = rows.reduce(
    (acc, row) => {
      const { table_header, table_footer } = row.props.metadata ?? {};

      const rowType = table_header
        ? "header"
        : table_footer
        ? "footer"
        : "body";

      acc[rowType].push(row);
      return acc;
    },
    { header: [], body: [], footer: [] }
  );

  return (
    <div className={getClasses()}>
      <table className={prefix}>
        <thead>{groupedRows.header}</thead>
        <tbody>{groupedRows.body}</tbody>
        <tfoot>{groupedRows.footer}</tfoot>
      </table>
    </div>
  );
};
