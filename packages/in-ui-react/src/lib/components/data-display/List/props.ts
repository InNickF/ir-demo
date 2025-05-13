import { HTMLAttributes, ReactNode } from "react";
import { ListComponent } from ".";
import { Size } from "../../utils/types";
import { Body, Row, Data, Header, Head } from "./components";

export interface ListProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Default: 'normal' |
   * Specifies the list size with a string.
   */
  size?: Size;
  /**
   * The classic React children prop.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
}

export type ListComponentGroup = typeof ListComponent & {
  /**
   * ListRow component
   */
  Row: typeof Row;
  /**
   * ListCol component
   */
  Data: typeof Data;
  /**
   * ListHeader component
   */
  Header: typeof Header;
  /**
   * ListBody component
   */
  Body: typeof Body;
  /**
   * ListHead component
   */
  Head: typeof Head;
};

export interface ListDataProps {
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
}

export interface ListRowProps {
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
  /**
   * Default: 'false' |
   * Specifies if the row of the list need a divider.
   */
  divider?: boolean;
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
}

export interface ListHeaderProps {
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
}

export interface ListHeadProps {
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
}

export interface ListBodyProps {
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
}
