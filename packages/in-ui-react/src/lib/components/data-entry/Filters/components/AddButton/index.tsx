import { PlusIcon } from "@heroicons/react/24/outline";
import { forwardRef, useRef } from "react";
import { MenuButton, useMenuState } from "reakit/Menu";
import { Button } from "../../../../general/Button";
import { AddFilterButtonProps, FilterType, OptionType } from "../../props";
import { MenuContainer } from "../MenuContainer";
import { MenuHeader } from "../MenuHeader";
import { MenuItemButton } from "../MenuItemButton";
import "./styles.css";

export const AddFilterButton = forwardRef<
  HTMLButtonElement,
  AddFilterButtonProps<OptionType>
>(
  (
    {
      filters,
      filteredOptions,
      className,
      onDelete,
      onAdd,
      kind,
      size,
      isLoading,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef(null);
    const menu = useMenuState();

    const prefix = "in-ui-filters__add-filter";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      kind && classes.push(`${prefix}__${kind}`);
      return classes.join(" ");
    };

    const menuItemClasses = (filter: FilterType<OptionType>): string => {
      const classes: string[] = [`${prefix}-menu-item`];
      Object.keys(filteredOptions).includes(filter.key as string) &&
        classes.push(`${prefix}-menu-item__active`);
      return classes.join(" ");
    };

    return (
      <>
        <MenuButton
          {...menu}
          ref={ref}
          as={Button}
          unstable_disclosureRef={buttonRef}
          kind={Object.keys(filteredOptions).length > 0 ? "ghost" : "outline"}
          size={size}
          icon={<PlusIcon />}
          iconPosition="right"
          className={getClasses()}
          loading={isLoading}
          {...props}
        >
          Add Filter
        </MenuButton>
        <MenuContainer {...menu}>
          <MenuHeader
            headerTitle="Add Filter"
            actionText="Remove all filters"
            onActionClick={() => {
              onDelete();
              menu.hide();
            }}
          />
          <div className={`${prefix}-menu-wrapper`}>
            {filters.map((filter, index) => (
              <MenuItemButton
                {...menu}
                key={index}
                label={filter.name}
                className={menuItemClasses(filter)}
                unDeletable={filter.unDeletable}
                onClick={() => {
                  onAdd(filter.key);
                  menu.hide();
                }}
              />
            ))}
          </div>
        </MenuContainer>
      </>
    );
  }
);

AddFilterButton.displayName = "AddFilterButton";
