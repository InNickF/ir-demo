import { dispatchGeneralFiltersAppliedEvent } from "@/commons/events/generalFiltersApplied";
import { objectWithSomeValueOrNull } from "@/commons/utils/object-has-some-value";
import { GenericFilterPayload, GenericChoices } from "@/commons/typings";
import { Skeleton } from "in-ui-react";
import { useState } from "react";
import { ApplyButton } from "./components/ApplyButton";
import { ClearButton } from "./components/ClearButton";
import { DrawerFilters } from "./components/DrawerFilters";
import { Filters } from "./components/Filters";
import "./styles.css";

export type Filter = GenericFilterPayload & { search?: string };
interface PageFiltersProps<TSelectFields extends GenericChoices> {
  initialFilters: Filter;
  selectFields: TSelectFields;
  isLoading: boolean;
  isRefreshing?: boolean;
  hasSearch?: boolean;
  applyFilters: (
    filters: PageFiltersProps<TSelectFields>["initialFilters"]
  ) => void;
  clearFilters: () => void;
  inlineInputClassName?: string;
  drawerInputClassName?: string;
  className?: string;
}

export function PageFilters<TSelectFields extends GenericChoices>({
  initialFilters,
  selectFields,
  isLoading,
  isRefreshing = false,
  hasSearch = false,
  applyFilters,
  clearFilters,
  className,
  inlineInputClassName,
  drawerInputClassName,
}: PageFiltersProps<TSelectFields>) {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const hasFilters = objectWithSomeValueOrNull(filters);

  const setFieldValue = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const closeDrawer = () => {
    setFilterDrawerOpen(false);
  };

  const openDrawer = () => {
    setFilterDrawerOpen(true);
  };

  const onApply = () => {
    applyFilters(filters);
    setSelectedFilters(filters);
    filterDrawerOpen && closeDrawer();
    dispatchGeneralFiltersAppliedEvent();
  };

  const allObjetKeysToEmptyString = (obj: Filter) => {
    const newObj: Filter = {};
    Object.keys(obj).forEach((key) => {
      newObj[key] = "";
    });
    return newObj;
  };

  const onClear = () => {
    clearFilters();
    setFilters(allObjetKeysToEmptyString(initialFilters));
    setSelectedFilters(allObjetKeysToEmptyString(initialFilters));
    filterDrawerOpen && closeDrawer();
    dispatchGeneralFiltersAppliedEvent();
  };

  const Actions = () => {
    return (
      <>
        <ApplyButton onClick={onApply} />
        <ClearButton onClick={onClear} hasFilters={Boolean(hasFilters)} />
      </>
    );
  };

  const getClasses = () => {
    const classNames = ["acq-page-filters"];
    className && classNames.push(className);
    return classNames.join(" ");
  };

  return (
    <div className={getClasses()}>
      {isLoading ? (
        <Skeleton className="h-[36px] 2xl:h-[62px] w-4/5">
          <Skeleton.Text className="h-[36px] 2xl:h-[62px] w-full" />
        </Skeleton>
      ) : (
        <>
          <Filters
            className="acq-page-filters-desktop"
            inputClassName={inlineInputClassName || "w-52"}
            hasSearch={hasSearch}
            isRefreshing={isRefreshing}
            currentSearch={filters.search}
            setFilters={setFieldValue}
            selectFields={selectFields}
            filters={filters}
          >
            <Actions />
          </Filters>

          <DrawerFilters
            actions={<Actions />}
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
            filterDrawerOpen={filterDrawerOpen}
            isLoading={isLoading}
            selectedFilters={selectedFilters}
          >
            <Filters
              className="acq-page-filters__drawer"
              hasSearch={hasSearch}
              isRefreshing={isRefreshing}
              inputClassName={drawerInputClassName}
              currentSearch={filters.search}
              setFilters={setFieldValue}
              selectFields={selectFields}
              filters={filters}
              inDrawer
            />
          </DrawerFilters>
        </>
      )}
    </div>
  );
}
