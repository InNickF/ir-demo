import { GenericChoices } from "@/commons/typings";
import { FC, PropsWithChildren } from "react";
import { FilterText } from "./FilterText";
import { SearchField } from "./SearchField";
import { SelectFields } from "./SelectFields";
import { Filter } from "..";

interface FilterProps extends PropsWithChildren {
  hasSearch?: boolean;
  isRefreshing: boolean;
  currentSearch?: string;
  setFilters: (key: string, value: string) => void;
  selectFields: GenericChoices;
  filters: Filter;
  className?: string;
  inputClassName?: string;
  inDrawer?: boolean;
}

export const Filters: FC<FilterProps> = ({
  hasSearch,
  currentSearch,
  isRefreshing,
  setFilters,
  selectFields,
  filters,
  children,
  className,
  inputClassName,
  inDrawer,
}) => {
  const getClasses = () => {
    const classNames = ["generic-entrance-animation"];
    className && classNames.push(className);
    return classNames.join(" ");
  };
  return (
    <div className={getClasses()}>
      <FilterText />
      <SearchField
        className={inputClassName}
        showInput={hasSearch}
        loading={isRefreshing}
        value={currentSearch}
        onChange={setFilters}
        color={inDrawer ? "over-ghost" : "default"}
      />
      <SelectFields
        className={inputClassName}
        selects={selectFields}
        loading={isRefreshing}
        setSelectValue={setFilters}
        currentFilters={filters}
        color={inDrawer ? "over-ghost" : "default"}
      />
      {children}
    </div>
  );
};
