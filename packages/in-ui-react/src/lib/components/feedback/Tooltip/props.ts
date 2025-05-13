/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes } from "react";
import { TooltipInitialState } from "reakit/ts";
export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specifies the tooltip content.
   */
  content: string | JSX.Element;
  children: any;
  options?: TooltipInitialState;
  className?: string;
}
