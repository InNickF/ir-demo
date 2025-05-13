import { forwardRef } from "react";
import {
  ActiveFiltersProps,
  CustomFilterType,
  FilterType,
  FiltersPayloadType,
  OptionType,
  TextFilterType,
} from "../../props";
import { FilterCustom } from "../FilterCustom";
import { FilterInput } from "../FilterInput";
import { FilterSelect } from "../FilterSelect";
import "./styles.css";

const ActiveFiltersInner = <T extends OptionType, P extends FiltersPayloadType>(
  {
    filters,
    filteredOptions,
    isLoading,
    kind,
    className,
    onFiltersChange,
    onDelete,
    onClear,
    hideTitle = false,
    autoInitialFocus = true,
    size = "normal",
  }: ActiveFiltersProps<T, P>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const prefix = "in-ui-filters__active-filters";

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const mergedFilters = Object.keys(filteredOptions)
    .map((key) => filters.find(({ key: filterKey }) => filterKey === key))
    .filter(Boolean) as FilterType<OptionType>[];

  return (
    <>
      <div className={getClasses()} ref={ref}>
        {!hideTitle ? <p className={`${prefix}__title`}>Filters: </p> : null}
        {mergedFilters.map((item) => {
          return (
            <div key={`filter-${item.name}`}>
              {item?.type === "text" ? (
                <FilterInput
                  filter={item as TextFilterType}
                  filteredOptions={filteredOptions}
                  isLoading={isLoading}
                  kind={kind}
                  unDeletable={item?.unDeletable}
                  autoInitialFocus={autoInitialFocus}
                  size={size}
                  onDelete={(filter) => onDelete(filter.key)}
                  onChange={(filter) => onFiltersChange(filter)}
                />
              ) : null}

              {item?.type === "simple-select" ||
              item?.type === "multi-select" ? (
                <FilterSelect
                  filter={item}
                  filteredOptions={filteredOptions}
                  isLoading={isLoading}
                  kind={kind}
                  isMulti={item?.type === "multi-select"}
                  unDeletable={item?.unDeletable}
                  autoInitialFocus={autoInitialFocus}
                  size={size}
                  onSelect={(filter) => onFiltersChange(filter)}
                  onDelete={(filter) => onDelete(filter.key)}
                  onClear={(filter) => onClear(filter.key)}
                />
              ) : null}

              {item?.type === "custom" ? (
                <FilterCustom
                  filter={item as unknown as CustomFilterType<P>}
                  filteredOptions={filteredOptions}
                  isLoading={isLoading}
                  kind={kind}
                  autoInitialFocus={autoInitialFocus}
                  onDelete={(filter) => onDelete(filter.key)}
                  unDeletable={item?.unDeletable}
                  size={size}
                  onApply={onFiltersChange}
                  onClear={() => onClear(item.key)}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
const forward = forwardRef(ActiveFiltersInner);
forward.displayName = "ActiveFilters";
export const ActiveFilters = forward as <
  T extends OptionType,
  P extends FiltersPayloadType
>(
  props: ActiveFiltersProps<T, P> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ActiveFiltersInner>;
