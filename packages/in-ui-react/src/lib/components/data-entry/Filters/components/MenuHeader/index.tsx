import { forwardRef } from "react";
import { Button } from "../../../../general/Button";
import "./styles.css";
import { MenuHeaderProps } from "../../props";

export const MenuHeader = forwardRef<HTMLDivElement, MenuHeaderProps>(
  (
    {
      headerTitle,
      className,
      actionText = "Remove filter",
      onActionClick,
      children,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-filters__menu-header";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <div className={getClasses()} ref={ref}>
        <div className={`${prefix}-title`}>
          <p>{headerTitle}</p>
          {onActionClick ? (
            <Button
              className={`${prefix}-action`}
              color="error"
              size="small"
              kind="ghost"
              onClick={onActionClick}
              {...props}
            >
              {actionText}
            </Button>
          ) : null}
        </div>
        {children}
      </div>
    );
  }
);

MenuHeader.displayName = "MenuHeader";
