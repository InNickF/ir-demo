import { forwardRef } from "react";
import { IconProps } from "./props";
import "./styles.css";

/**
 * In UI Icon Component
 * @see {@link https://todo.com/} for official documentation.
 * @param name
 * Required |
 * Specifies the icon.
 * @param color
 * Default: 'currentColor' |
 * Specifies the icon style color with a string.
 * @param size
 *  Default: 'normal' |
 * Specifies the icon size between small, normal and big.
 * @param specificSize
 *  Default: null |
 * Specifies the icon size a string Ex: 200px || 10% || 5rem || 2em.
 * @param solid
 * Default: false |
 * Specifies if the icon will be solid or outline.
 * @param hoverTransition
 * Default: false |
 * Specifies if the icon will be a hover effect.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @returns
 * A inUI Icon react component from {@link https://heroicons.com/}
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      svg,
      color,
      size = "normal",
      hoverTransition = false,
      specificSize = "",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-icon";
    const getClasses = (): string => {
      const currentColor = color
        ? `${prefix}--${color}`
        : `${prefix}--current-color`;
      const classes: string[] = [`${prefix}`, currentColor];
      !specificSize && classes.push(`${prefix}--${size}-size`);
      hoverTransition && classes.push(`${prefix}--hover`);
      className && classes.push(className);
      svg?.props?.className && classes.push(svg.props.className);
      return classes.join(" ");
    };
    const getStyle = () => {
      return specificSize
        ? {
            width: specificSize,
            height: specificSize,
            ...style,
            ...svg?.props?.style,
          }
        : undefined;
    };

    return (
      <svg.type
        {...svg?.props}
        style={getStyle()}
        className={getClasses()}
        ref={ref}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";
