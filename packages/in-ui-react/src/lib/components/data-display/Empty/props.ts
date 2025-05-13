import { HTMLAttributes, ReactNode } from "react";
import { IconProps } from "../../general/Icon/props";

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: <p>There is no information to show.</p> |
   * Specifies the text to be shown
   */
  description?: JSX.Element;
  /**
   * Default: "inbox" |
   * Specifies the icon to be shown
   */
  icon?: IconProps["svg"];
  /**
   * Default: "3.5rem" |
   * Specifies the icon size with string Ex: 200px || 10% || 5rem || 2em.
   */
  iconSize?: string;
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
  /**
   * Default: undefined |
   * You can use this prop to send a string with your custom css
   */
  className?: string;
  /**
   * Default: false |
   * Specifies if the component will show only the description
   */
  onlyText?: boolean;
}
