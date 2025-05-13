import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Arguments as UseSortableArguments } from "@dnd-kit/sortable/dist/hooks/useSortable";
import {
  ComponentProps,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
} from "react";
import { TableWrapper } from ".";
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
import { Color, Size } from "../../utils/types";

export interface TablePaginationProps {
  /**
   * Specifies the total number of pages.
   */
  total: number;
  /**
   * Specifies the current page.
   */
  current: number;
  /**
   * Default: undefined |
   * You can use this props to send a string with you custom css classes.
   */
  className?: string;
  /**
   * Specifies changePage event handler
   */
  onChangePage: (value: number) => void;
}

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Default: false |
   * Specifies if the table is a spreadsheet.
   * Set new Table.Data, Table.Row and Table.Header styles.
   */
  spreadsheet?: boolean;
  /**
   * Default: false |
   * Make first row and headers sticky (Only works with spreadsheet prop enabled)
   */
  stickyData?: boolean;
}

export type TableHeadProps = JSX.IntrinsicElements["thead"];

export type TableFootProps = JSX.IntrinsicElements["tfoot"];

type SortingProps =
  | {
      /**
       * Shared sorting state from the parent
       */
      ordering: string;
      /**
       * Identifier sorting key to send as param
       */
      orderingKey: string;
      /**
       * Table header sorting click event handler
       */
      onOrdering: (T: string) => void;
    }
  | {
      ordering?: null;
      orderingKey?: never;
      onOrdering?: never;
    };

export type TableHeaderProps = SortingProps & JSX.IntrinsicElements["th"];

export interface TableDataSecondSlotState {
  isShowingSecondSlot: boolean;
  setSecondSlot: (value: boolean) => void;
}
export interface TableDataProps extends TdHTMLAttributes<HTMLTableCellElement> {
  secondSlot?: (state: TableDataSecondSlotState) => ReactNode;
  onSecondSlot?: (state: TableDataSecondSlotState) => void;
  onLeaveSecondSlot?: (state: TableDataSecondSlotState) => void;
  onLeaveSecondSlotWithEscape?: (state: TableDataSecondSlotState) => void;
  onLeaveSecondSlotWithDoubleClick?: (state: TableDataSecondSlotState) => void;
  onLeaveSecondSlotWithClick?: (state: TableDataSecondSlotState) => void;
  wrapText?: boolean;
  spreadsheetLineColor?: "ghost" | "classic" | Color;
  size?: Size;
  textAlignment?: "left" | "center" | "right";
  monospaceFont?: boolean;
}

export type TableRowProps = JSX.IntrinsicElements["tr"];

export interface TableDraggableRowProps
  extends Omit<TableRowProps, "id" | "children">,
    UseSortableArguments {
  htmlId?: string;
  children: (sortableState: ReturnType<typeof useSortable>) => ReactNode;
  disableRowListeners?: boolean;
}

export type TableBodyProps = JSX.IntrinsicElements["tbody"];

export interface TableDroppableBodyProps
  extends Omit<ComponentProps<typeof DndContext>, "id" | "children">,
    Omit<ComponentProps<typeof SortableContext>, "id" | "children">,
    Omit<
      TableBodyProps,
      | "id"
      | "onDragStart"
      | "onDragMove"
      | "onDragOver"
      | "onDragEnd"
      | "onDragCancel"
    > {
  id: string;
  /**
   * Default: 250 |
   * Specifies the delay for default sensors.
   */
  sensorDelay?: number;
}

export type TableGroupType = typeof TableWrapper & {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  DroppableBody: typeof TableDroppableBody;
  Row: typeof TableRow;
  DraggableRow: typeof TableDraggableRow;
  Data: typeof TableData;
  Head: typeof TableHead;
  Foot: typeof TableFoot;
  Pagination: typeof TablePagination;
};
