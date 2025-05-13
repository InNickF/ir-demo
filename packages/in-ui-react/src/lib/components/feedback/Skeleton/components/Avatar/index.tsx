import { forwardRef } from "react";
import { SkeletonAvatarProps } from "../../props";
import "./styles.css";

/**
 * In UI SkeletonAvatar Component
 * @see {@link https://todo.com/} for official documentation.
 * @param kind
 * Default: 'circle' |
 * Specifies the quantity of paragraphs to render.
 * @param size
 * Default: 'medium' |
 * Specifies the quantity of paragraphs to render.
 * @returns
 * A inUI SkeletonAvatar react component
 */
export const SkeletonAvatar = forwardRef<HTMLSpanElement, SkeletonAvatarProps>(
  ({ shape = "circle", size = "medium", className, ...props }, ref) => {
    const prefix = "in-ui-skeleton-avatar";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`, `${prefix}--${size}`];
      shape === "circle" && classes.push(`${prefix}--circle`);
      className && classes.push(className);
      return classes.join(" ");
    };
    return <span ref={ref} className={getClasses()} {...props} />;
  }
);

SkeletonAvatar.displayName = "SkeletonAvatar";
