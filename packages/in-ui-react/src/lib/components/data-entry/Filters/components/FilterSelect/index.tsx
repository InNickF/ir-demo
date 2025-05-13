import { forwardRef, useEffect, useRef, useState } from "react";
import { MenuButton, useMenuState } from "reakit/Menu";
import { Button } from "../../../../general/Button";
import { useFocusInputOnMenuVisible } from "../../hooks/useFocusInputOnMenuVisible";
import { FilterSelectProps, FiltersPayloadType, OptionType } from "../../props";
import "../../styles.css";
import { menuButtonText } from "../../utils";
import { MenuContainer } from "../MenuContainer";
import { MenuHeader } from "../MenuHeader";
import { MenuItemButton } from "../MenuItemButton";
import { MenuSearch } from "../MenuSearch";

const FilterSelectInner = <T extends OptionType, P extends FiltersPayloadType>(
  {
    filter,
    filteredOptions,
    className,
    isLoading,
    kind,
    isMulti = false,
    unDeletable = false,
    autoInitialFocus = true,
    size,
    onDelete,
    onSelect,
    onClear,
    ...props
  }: FilterSelectProps<T, P>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const prefix = "in-ui-filters__select";
  const [localOptions, setLocalOptions] = useState(filter.options);

  const menu = useMenuState({
    unstable_fixed: true,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useFocusInputOnMenuVisible({
    inputRef,
    isMenuVisible: menu.visible,
  });

  useEffect(() => {
    autoInitialFocus &&
      !unDeletable &&
      setTimeout(() => {
        menu.show();
        inputRef.current?.focus();
      }, 100);
  }, []);

  const filteredOption = filteredOptions[filter.key] as string | string[];

  const isValueStringType = typeof filteredOption === "string";

  const isOptionActiveInFilter = (option: OptionType) =>
    isValueStringType
      ? filteredOption === option.value
      : filteredOption?.includes(option.value.toString());

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    className && classes.push(className);
    kind && classes.push(`${prefix}-${kind}`);
    (filteredOption?.length || menu.visible) &&
      classes.push(`${prefix}-${kind}__active`);
    return classes.join(" ");
  };

  const menuItemClasses = (option: OptionType) => {
    const classes: string[] = [`${prefix}-menu-item`];
    isOptionActiveInFilter(option) &&
      classes.push(`${prefix}-menu-item__active`);
    return classes.join(" ");
  };

  const handleSingleSelect = (option: OptionType, applicableFilters: P) => {
    const selectedValue = option.value.toString();

    if (
      applicableFilters[filter.key as keyof P] === selectedValue &&
      !filter.unDeletable
    ) {
      delete applicableFilters[filter.key];
    } else {
      applicableFilters[filter.key as keyof P] = selectedValue as P[keyof P];
    }

    return applicableFilters;
  };

  const handleMultiSelect = (option: OptionType, applicableFilters: P) => {
    const selectedValue = option.value.toString();

    if (!isOptionActiveInFilter(option)) {
      applicableFilters[filter.key as keyof P] = [
        ...(filteredOption || []),
        selectedValue,
      ] as P[keyof P];
      return applicableFilters;
    }

    if (!filter.unDeletable || filteredOption.length > 1) {
      applicableFilters[filter.key as keyof P] = (
        filteredOption as string[]
      ).filter((item) => {
        return item !== selectedValue;
      }) as P[keyof P];
      return applicableFilters;
    }

    if (filter.unDeletable && filteredOption.length === 1) {
      applicableFilters[filter.key as keyof P] = filteredOption as P[keyof P];
      return applicableFilters;
    }

    return applicableFilters;
  };

  const selectOptionHandler = (option: OptionType) => {
    let newFilteredOptions = {} as P;

    if (isValueStringType && !isMulti) {
      newFilteredOptions = handleSingleSelect(option, { ...filteredOptions });
    } else {
      newFilteredOptions = handleMultiSelect(option, { ...filteredOptions });
    }

    onSelect(newFilteredOptions);
    setLocalOptions(filter.options);
  };

  const clearOptionsHandler = () => {
    onClear(filter);
    setLocalOptions(filter.options);
  };

  const menuSearchPills = filter.options.filter((option) => {
    return isValueStringType
      ? option.value === filteredOption
      : filteredOption?.includes(option.value.toString());
  });

  const EmptyMenuWrapper = () => {
    const searchNotSuccessful = filter.options.length && !localOptions.length;
    const noData = !filter.options.length;

    return (
      <div className={`${prefix}-menu-empty`}>
        {searchNotSuccessful ? "No results found" : null}
        {noData ? "No data" : null}
      </div>
    );
  };

  const pillActionHandler = (option: OptionType) => {
    if (Array.isArray(filteredOption)) {
      const newFilteredOptions = (filteredOption as string[]).filter(
        (item) => item !== option.value.toString()
      );
      onSelect({ ...filteredOptions, [filter.key]: newFilteredOptions });
    } else {
      onSelect({ ...filteredOptions, [filter.key]: "" });
    }
  };

  const buttonText = menuButtonText({ filter, filteredOption });

  const shortMenuButtonText =
    buttonText.length > 40 ? `${buttonText.substring(0, 40)}...` : buttonText;

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
        {shortMenuButtonText}
      </MenuButton>
      <MenuContainer {...menu}>
        <MenuHeader
          headerTitle={filter.name}
          onActionClick={unDeletable ? undefined : () => onDelete(filter)}
        >
          <MenuSearch
            ref={inputRef}
            filter={filter}
            pills={menuSearchPills}
            pillAction={
              (isMulti && filteredOption.length > 1) || !filter.unDeletable
                ? (option) => pillActionHandler(option)
                : undefined
            }
            onClear={clearOptionsHandler}
            onSearch={(localOptions) => setLocalOptions(localOptions as T[])}
            unDeletable={unDeletable}
          />
        </MenuHeader>
        <div className={`${prefix}-menu-wrapper`}>
          {localOptions.length ? (
            localOptions.map((option, index) => (
              <MenuItemButton
                {...menu}
                key={index}
                label={option.label}
                className={menuItemClasses(option)}
                onClick={() => selectOptionHandler(option)}
              />
            ))
          ) : (
            <EmptyMenuWrapper />
          )}
        </div>
      </MenuContainer>
    </>
  );
};
const forward = forwardRef(FilterSelectInner);
forward.displayName = "FilterSelect";

export const FilterSelect = forward as <
  T extends OptionType,
  P extends FiltersPayloadType
>(
  props: FilterSelectProps<T, P> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof FilterSelectInner>;
