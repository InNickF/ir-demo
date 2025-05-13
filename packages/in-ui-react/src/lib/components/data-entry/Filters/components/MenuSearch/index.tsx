/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { XMarkIcon } from "@heroicons/react/24/outline";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Tag } from "../../../../data-display/Tag";
import { Button } from "../../../../general/Button";
import { setComponentRefs } from "../../../../utils/refs";
import { MenuSearchProps, OptionType } from "../../props";
import "./styles.css";

export const MenuSearch = forwardRef<
  HTMLInputElement,
  MenuSearchProps<OptionType>
>(
  (
    {
      filter,
      pills,
      className,
      pillAction,
      onSearch,
      onClear,
      unDeletable = false,
      ...props
    },
    ref
  ) => {
    const [localSearch, setLocalSearch] = useState("");
    const prefix = "in-ui-filters__menu-search";
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setLocalSearch("");
    }, [filter.options]);

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setLocalSearch(value);

      const filteredOptions =
        value === ""
          ? filter.options
          : filter.options.filter((option) =>
              option.label.toLowerCase().includes(value.toLowerCase())
            );
      onSearch(filteredOptions);
    };

    return (
      <>
        <div ref={ref} className={getClasses()} {...props}>
          <div
            className={`${prefix}-pills`}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            {pills.map((pill) => (
              <Tag
                key={pillAction ? `${pill.value}-actionable` : pill.value}
                text={pill.label}
                size="small"
                textSliceLength={10}
                className={`${prefix}-pill`}
                action={pillAction ? () => pillAction(pill) : undefined}
              />
            ))}
            <div className={`${prefix}-input`}>
              <input
                ref={setComponentRefs(inputRef, ref)}
                value={localSearch}
                onChange={(e) => searchInputHandler(e)}
              />
            </div>
          </div>
          {!unDeletable ? (
            <Button
              onlyIcon
              className={`${prefix}-clear`}
              icon={<XMarkIcon />}
              kind="ghost"
              onClick={onClear}
            />
          ) : null}
        </div>
      </>
    );
  }
);

MenuSearch.displayName = "MenuSearch";
