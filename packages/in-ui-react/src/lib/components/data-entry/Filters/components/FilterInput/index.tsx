import { XMarkIcon } from "@heroicons/react/24/outline";
import { forwardRef, useEffect, useRef, useState } from "react";
import { MenuButton, useMenuState } from "reakit/Menu";
import { Tooltip } from "../../../../feedback/Tooltip";
import { Button } from "../../../../general/Button";
import { Input } from "../../../Input";
import { useFocusInputOnMenuVisible } from "../../hooks/useFocusInputOnMenuVisible";
import { FilterInputProps, FiltersPayloadType } from "../../props";
import { MenuContainer } from "../MenuContainer";
import { MenuHeader } from "../MenuHeader";
import "./styles.css";

const FilterInputInner = <P extends FiltersPayloadType>(
  {
    filter,
    filteredOptions,
    className,
    isLoading,
    kind,
    onDelete,
    onChange,
    size,
    unDeletable = false,
    autoInitialFocus = true,
    ...props
  }: FilterInputProps<P>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const prefix = "in-ui-filters__text";
  const [inputValue, setInputValue] = useState("");
  const filterValue = filteredOptions[filter.key] as string | string[];
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

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    className && classes.push(className);
    kind && classes.push(`${prefix}-${kind}`);
    (filterValue?.length || menu.visible) &&
      classes.push(`${prefix}-${kind}__active`);
    return classes.join(" ");
  };

  const MenuButtonText = () => {
    const shortFilterValue =
      filterValue && filterValue.length > 20
        ? `${String(filterValue).substring(0, 20)}...`
        : filterValue;

    const buttonText = `${filter.name}${
      filterValue ? `: ${shortFilterValue}` : ""
    }`;

    return (
      <>
        {filterValue?.length > 20 ? (
          <Tooltip content={filterValue as string}>
            <span>{buttonText}</span>
          </Tooltip>
        ) : (
          <span>{buttonText}</span>
        )}
      </>
    );
  };

  useEffect(() => {
    if (inputValue !== "") {
      const timeout = setTimeout(() => {
        onChange({
          ...filteredOptions,
          [filter.key]: inputValue,
        });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [inputValue]);

  const clearSearchHandler = () => {
    setInputValue("");
    onChange({
      ...filteredOptions,
      [filter.key]: "",
    });
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
        <MenuButtonText />
      </MenuButton>
      <MenuContainer {...menu}>
        <MenuHeader
          headerTitle={filter.name}
          onActionClick={unDeletable ? undefined : () => onDelete(filter)}
        />
        <div className={`${prefix}-menu-wrapper`}>
          <Input
            ref={inputRef}
            placeholder="Search"
            color="over-ghost"
            rightIcon={<XMarkIcon />}
            rightIconAction={clearSearchHandler}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </MenuContainer>
    </>
  );
};

const forward = forwardRef(FilterInputInner);
forward.displayName = "FilterInput";

export const FilterInput = forward as <P extends FiltersPayloadType>(
  props: FilterInputProps<P> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof FilterInputInner>;
