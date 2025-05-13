import { GenericFilterPayload, IsLoadingProp } from "@/commons/typings";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Button, Drawer } from "in-ui-react";
import { FC, PropsWithChildren, ReactNode } from "react";

interface DrawerFiltersProps extends PropsWithChildren, IsLoadingProp {
  openDrawer: () => void;
  closeDrawer: () => void;
  filterDrawerOpen: boolean;
  actions: ReactNode;
  selectedFilters: GenericFilterPayload;
}

const getQuantityOfActiveFilters = (filters: GenericFilterPayload) => {
  return Object.values(filters).filter((value) => value).length;
};

export const DrawerFilters: FC<DrawerFiltersProps> = ({
  actions,
  children,
  closeDrawer,
  filterDrawerOpen,
  isLoading,
  openDrawer,
  selectedFilters,
}) => {
  const activeFilters = getQuantityOfActiveFilters(selectedFilters);
  const filterText =
    activeFilters === 0
      ? "No filters selected."
      : activeFilters > 1
      ? "filters selected."
      : "filter selected.";
  return (
    <>
      <section className="acq-page-filters-mobile">
        <Button
          onClick={openDrawer}
          icon={<FunnelIcon />}
          iconPosition="right"
          kind="outline"
          loading={isLoading}
          className="acq-page-filters-mobile__cta"
        >
          Filters
        </Button>
        <p className="self-center">
          {activeFilters || null} {filterText}
        </p>
      </section>
      <Drawer
        isOpen={filterDrawerOpen}
        close={closeDrawer}
        placement="right"
        header={<Drawer.Header title="Filter by" />}
      >
        <div className="acq-page-filters__drawer p-6">
          {children}
          <div className="flex flex-col gap-4">{actions}</div>
        </div>
      </Drawer>
    </>
  );
};
