import { forwardRef, useEffect } from "react";
import { MenuButton, useMenuState } from "reakit/Menu";
import { Button } from "../../../../general/Button";
import {
  CustomFilterType,
  FilterCustomProps,
  FiltersPayloadType,
} from "../../props";
import { menuButtonText } from "../../utils";
import { MenuContainer } from "../MenuContainer";
import { MenuHeader } from "../MenuHeader";
import "./styles.css";

const FilterCustomInner = <P extends FiltersPayloadType>(
  {
    filter,
    filteredOptions,
    className,
    isLoading,
    kind,
    unDeletable = false,
    autoInitialFocus = true,
    size,
    onDelete,
    onApply,
    onClear,
    ...props
  }: FilterCustomProps<P>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const prefix = "in-ui-filters__custom";
  const filterValue = filteredOptions[filter.key];

  const menu = useMenuState({
    unstable_fixed: true,
  });

  useEffect(() => {
    autoInitialFocus &&
      !unDeletable &&
      setTimeout(() => {
        menu.show();
      }, 100);
  }, []);

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    className && classes.push(className);
    kind && classes.push(`${prefix}-${kind}`);
    ((filterValue !== undefined &&
      filterValue !== null &&
      filterValue !== "") ||
      menu.visible) &&
      classes.push(`${prefix}-${kind}__active`);
    return classes.join(" ");
  };

  return (
    <>
      <MenuButton
        {...menu}
        ref={ref}
        as={Button}
        kind="outline"
        size={size}
        className={getClasses()}
        loading={isLoading}
        {...props}
      >
        {menuButtonText({
          filter: filter as unknown as CustomFilterType<FiltersPayloadType>,
          filteredOption: filteredOptions[filter.key],
        })}
      </MenuButton>
      <MenuContainer {...menu}>
        <MenuHeader
          headerTitle={filter.name}
          onActionClick={unDeletable ? undefined : () => onDelete(filter)}
        />
        <div className={`${prefix}-menu-wrapper`}>
          {filter?.render({
            filteredOptions,
            isLoading,
            onApply,
            onClear,
            filter: {
              key: filter.key,
              name: filter.name,
              unDeletable: filter.unDeletable,
            },
          })}
        </div>
      </MenuContainer>
    </>
  );
};
const forward = forwardRef(FilterCustomInner);
forward.displayName = "FilterCustom";

export const FilterCustom = forward as <P extends FiltersPayloadType>(
  props: FilterCustomProps<P> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof FilterCustomInner>;
