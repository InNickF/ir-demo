import { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: false |
   * Specifies if the container will fill the total width of the horizontal viewport.
   */
  fluid?: true | false;
}
