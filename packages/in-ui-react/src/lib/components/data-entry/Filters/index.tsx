import { ActiveFilters } from "./components/ActiveFilters";
import { AddFilterButton } from "./components/AddButton";
import { FiltersPayloadType, FiltersProps, OptionType } from "./props";
import "./styles.css";

/**
 * InUI Page Filters Component
 * @see {@link https://todo.com/} for official documentation.

 * @returns
 * A inUI Page Filters react component
 */

export const Filters = <
  Options extends OptionType,
  P extends FiltersPayloadType
>({
  filters,
  filteredOptions,
  isLoading = false,
  kind = "ghost",
  className,
  onApply,
  onClear,
  hideTitle = false,
  hideAddButton = false,
  autoInitialFocus = true,
  size = "normal",
  ...props
}: FiltersProps<Options, P>) => {
  const prefix = "in-ui-filters";

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const deleteSpecificFilter = (filterKey: string) => {
    return Object.keys(filteredOptions).reduce((acc, key: keyof P) => {
      if (key !== filterKey) {
        acc[key] = filteredOptions[key];
      }
      return acc;
    }, {} as P);
  };

  const filterHandler = (filterKey: string) => {
    const filterIsAdded = filterKey in filteredOptions;

    if (filterIsAdded) {
      onApply(deleteSpecificFilter(filterKey));
      return;
    }

    onApply({
      ...filteredOptions,
      [filterKey]: "",
    });
  };

  const deleteFilterHandler = (filterKey: string) => {
    const newFilteredOptions = deleteSpecificFilter(filterKey);
    onApply(newFilteredOptions);
  };

  const deleteAllFilters = () => {
    const newFilteredOptions = Object.keys(filteredOptions)
      .filter(
        (key) => filters.find((filter) => filter.key === key)?.unDeletable
      )
      .reduce((acc, key: keyof P) => {
        acc[key] = filteredOptions[key];
        return acc;
      }, {} as P);
    onApply(newFilteredOptions);
  };

  const clearFilterHandler = (filterKey: string) => {
    onApply({
      ...filteredOptions,
      [filterKey]: "",
    });
    onClear?.();
  };

  return (
    <div className={getClasses()} {...props}>
      <ActiveFilters
        filters={filters}
        filteredOptions={filteredOptions}
        isLoading={isLoading}
        kind={kind}
        size={size}
        hideTitle={hideTitle}
        autoInitialFocus={autoInitialFocus}
        onClear={(filterKey) => clearFilterHandler(filterKey)}
        onDelete={(filterKey) => deleteFilterHandler(filterKey)}
        onFiltersChange={(filter) => onApply(filter)}
      />
      {!hideAddButton ? (
        <AddFilterButton
          filters={filters}
          filteredOptions={filteredOptions}
          kind={kind}
          size={size}
          isLoading={isLoading}
          onDelete={() => deleteAllFilters()}
          onAdd={(filterKey) => filterHandler(filterKey)}
        />
      ) : null}
    </div>
  );
};

Filters.displayName = "Filters";
