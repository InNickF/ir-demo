/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneElement, forwardRef } from "react";
import { TooltipProps } from "./props";
import {
  useTooltipState,
  Tooltip as RkTooltip,
  TooltipReference,
} from "reakit/Tooltip";
import "./styles.css";

/**
 * In UI Tooltip Component
 * @see {@link https://todo.com/} for official documentation.
 * @param content
 * Tooltip content (string | JSX.Element).
 * @param options
 * Specifies tooltip options. {@link https://reakit.io/docs/tooltip/#usetooltipstate}
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @interface TooltipProps
 * This is the custom interface created for this component logic.
 * @interface TooltipInitialState
 * @interface HTMLAttributes
 * @returns
 * A inUI tooltip react component
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, options, className, ...props }, ref) => {
    const tooltip = useTooltipState(options);

    const prefix = "in-ui-tooltip";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <>
        <TooltipReference {...tooltip} ref={children?.ref} {...children?.props}>
          {(referenceProps: any) => cloneElement(children, referenceProps)}
        </TooltipReference>
        <RkTooltip {...tooltip} {...props}>
          <div ref={ref} className={getClasses()}>
            {content}
          </div>
        </RkTooltip>
      </>
    );
  }
);
Tooltip.displayName = "Tooltip";
