import { MouseEvent, cloneElement, forwardRef } from "react";
import {
  Menu as BaseMenu,
  MenuButton,
  MenuItem,
  useMenuState,
} from "reakit/Menu";
import { Button } from "../Button";
import { DropdownProps } from "./props";
import "./styles.css";

/**
 * In UI Dropdown Component
 * @see {@link https://todo.com/} for official documentation.
 * @param className
 * Specifies css class for customizing style.
 * @param items
 * Action buttons specifications prop.
 * @param disclosure
 * Activation button
 * @interface DropdownProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI Dropdown react component
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      items,
      disclosure,
      menuProps,
      dropdownInitialState,
      "aria-label": ariaLabel = "Menu",
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-dropdown";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };
    const menu = useMenuState({ animated: 250, ...dropdownInitialState });

    const finalItems = items.map(({ onClick, text, ...props }) => (
      <Button
        key={text}
        kind="solid"
        className={`${prefix}__menu-container__item`}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          menu.hide();
          onClick?.(e);
        }}
        {...props}
      >
        {text}
      </Button>
    ));

    return (
      <>
        <div className={getClasses()} {...props}>
          <div className={`${prefix}__disclosure-container`}>
            <MenuButton
              ref={ref}
              {...menu}
              {...disclosure.props}
              unstable_disclosureRef={false}
            >
              {(disclosureProps) => cloneElement(disclosure, disclosureProps)}
            </MenuButton>
          </div>
          <BaseMenu
            {...menu}
            {...menuProps}
            aria-label={ariaLabel}
            className={`${prefix}__menu-container`}
          >
            {finalItems.map((item, i) => {
              return (
                <MenuItem {...menu} {...item.props} key={item.key || i}>
                  {(itemProps) => cloneElement(item, itemProps)}
                </MenuItem>
              );
            })}
          </BaseMenu>
        </div>
      </>
    );
  }
);

Dropdown.displayName = "Dropdown";
