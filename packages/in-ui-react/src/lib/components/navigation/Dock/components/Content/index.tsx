import { FC, forwardRef } from "react";
import { Content as RContent } from "@radix-ui/react-navigation-menu";
import { Heading } from "../../../../general/Heading";
import { Divider } from "../../../../layout/Divider";
import {
  ContentChildrenProps,
  ContentHeaderProps,
  DockContentProps,
} from "../../props";
import "./styles.css";

/**
 * In UI DockContent Component
 * @see {@link https://todo.com/} for official documentation.
 * @param label
 * Specifies the text to show as content header
 * @returns
 * A inUI DockContent react component
 */
const prefix = "in-ui-dock-item";

const ContentHeader: FC<ContentHeaderProps> = ({ label, hasChildren }) => {
  return (
    <>
      {hasChildren ? (
        <>
          <Heading kind="h6">{label}</Heading>
          <Divider className={`${prefix}__divider`} />
        </>
      ) : (
        <p className={`${prefix}__label--along`}>{label}</p>
      )}
    </>
  );
};

const ContentChildren: FC<ContentChildrenProps> = ({ children }) => {
  return (
    <>
      {children ? (
        <div className={`${prefix}__content-children`}>{children}</div>
      ) : null}
    </>
  );
};

export const DockContent = forwardRef<HTMLDivElement, DockContentProps>(
  ({ children, className, ...props }, ref) => {
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}__content`];
      className && classes.push(className);
      !children && classes.push(`${prefix}__content--no-children-width`);
      return classes.join(" ");
    };

    return (
      <RContent className={getClasses()} ref={ref} {...props}>
        <ContentChildren>{children}</ContentChildren>
      </RContent>
    );
  }
);

DockContent.displayName = "DockContent";
