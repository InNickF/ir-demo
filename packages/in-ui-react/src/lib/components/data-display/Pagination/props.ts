import { HTMLAttributes } from "react";
import { ChangePageHandler } from "./handlers";

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: undefined |
   * You can use this props to send a string with you custom css classes.
   */
  className?: string;
  /**
   * Default: 1 |
   * Specifies the current page.
   */
  current?: number;
  /**
   * Default: 10 |
   * Specifies the page selector size.
   */
  size?: number;
  /**
   * Specifies the total number of pages.
   */
  total: number;
  /**
   * Default: undefined |
   * Specifies changePage event handler
   */
  onChangePage?: ChangePageHandler;
  /**
   * Default: false |
   * Specifies if the last page selected is loading.
   */
  loading?: boolean;
}
