import { IsLoadingProp } from "@/commons/typings";
import { PropertyValidation } from "@/modules/tools/typings/property-level-validations";
import { FC, useMemo } from "react";
import {
  ListValidationDashboardFilter,
  ListValidationDashboardView,
} from "../../../../types";
import { PanelFilters } from "./components/PanelFilters";
import { PanelViews } from "./components/PanelViews";
import "./styles.css";
import {
  getPropertyValidationFilters,
  listValidationDashboardPanelCSSPrefix,
} from "./utils";

export interface ListValidationDashboardPanelProps extends IsLoadingProp {
  currentView: ListValidationDashboardView;
  currentFilter: ListValidationDashboardFilter;
  onChangeView: (view: ListValidationDashboardView) => void;
  onChangeFilter: (filter: ListValidationDashboardFilter) => void;
  data?: PropertyValidation[];
}

export const ListValidationDashboardPanel: FC<
  ListValidationDashboardPanelProps
> = ({
  currentView,
  currentFilter,
  onChangeView,
  onChangeFilter,
  isLoading,
  data,
}) => {
  const filters = useMemo(() => {
    return getPropertyValidationFilters(data || []);
  }, [data]);

  const handleChangeView = (view: ListValidationDashboardView) => {
    if (view === "matrix") {
      onChangeFilter("all");
    }
    onChangeView(view);
  };

  return (
    <header className={listValidationDashboardPanelCSSPrefix}>
      <PanelFilters
        currentFilter={currentFilter}
        disabled={currentView === "matrix"}
        onChangeFilter={(filter) => {
          onChangeFilter(filter);
        }}
        isLoading={isLoading}
        filters={filters}
      />
      <PanelViews
        currentView={currentView}
        isLoading={isLoading}
        onChangeView={(view) => {
          handleChangeView(view);
        }}
      />
    </header>
  );
};
