import { forwardRef } from "react";
import { SkeletonGroupType, SkeletonProps } from "./props";
import { SkeletonAvatar } from "./components/Avatar";
import { SkeletonText } from "./components/Text";
import "./styles.css";

/**
 * In UI Skeleton Component
 * @see {@link https://todo.com/} for official documentation.
 * @param loading
 * Default: true |
 * Set the skeleton animation
 * @param children
 * The classic React children prop.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your
 * @returns
 * A inUI Skeleton react component
 */
export const SkeletonWrapper = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ loading = true, children, className, ...props }, ref) => {
    const prefix = "in-ui-skeleton";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      loading && classes.push(`${prefix}--active`);
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <span className={getClasses()} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

SkeletonWrapper.displayName = "SkeletonWrapper";

const Skeleton = SkeletonWrapper as SkeletonGroupType;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Text = SkeletonText;

export default Skeleton;
