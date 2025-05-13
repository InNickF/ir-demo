import { forwardRef } from "react";
import {
  TableBody,
  TableData,
  TableDraggableRow,
  TableDroppableBody,
  TableFoot,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "./components";
import { TableGroupType, TableProps } from "./props";
import "./styles.css";

/**
 * In UI Table Component
 * @see {@link https://todo.com/} for official documentation.
 * @returns
 * A inUI Table react component
 */

export const TableWrapper = forwardRef<HTMLTableElement, TableProps>(
  (
    { children, className, spreadsheet = false, stickyData = false, ...props },
    ref
  ) => {
    const prefix = "in-ui-table";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      if (spreadsheet) {
        spreadsheet && classes.push(`${prefix}--spreadsheet`);
        stickyData && classes.push(`${prefix}--sticky-data`);
      }
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <table className={getClasses()} {...props} ref={ref}>
        {children}
      </table>
    );
  }
);

TableWrapper.displayName = "TableWrapper";

const Table = TableWrapper as TableGroupType;
Table.Head = TableHead;
Table.Foot = TableFoot;
Table.Body = TableBody;
Table.DroppableBody = TableDroppableBody;
Table.Row = TableRow;
Table.DraggableRow = TableDraggableRow;
Table.Data = TableData;
Table.Header = TableHeader;
Table.Pagination = TablePagination;

export default Table;
