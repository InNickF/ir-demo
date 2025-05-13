import { HTMLAttributes } from "react";
import { Shadow } from "../../utils/types";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: false |
   * Specifies if the card must have padding.
   */
  padding?: boolean;
  /**
   * Default: false |
   * Specifies hover box-shadow interaction.
   */
  hover?: boolean;
  /**
   * Default: "0" |
   * Specifies box-shadow level.
   */
  shadow?: Shadow;
}
