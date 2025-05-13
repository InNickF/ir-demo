import { useListPropertyValidations } from "@/modules/tools/services/queries/property-level-validations";
import { FC, useState } from "react";
import { useListValidationQueryParams } from "../../hooks/useListValidationQueryParams";
import {
  ListValidationDashboardFilter,
  ListValidationDashboardView,
} from "../../types";
import { ListValidationDashboardContent } from "./components/ListValidationDashboardContent";
import { ListValidationDashboardPanel } from "./components/ListValidationDashboardPanel";

export const ListValidationDashboard: FC = () => {
  const [view, setView] = useState<ListValidationDashboardView>("properties");
  const [filter, setFilter] = useState<ListValidationDashboardFilter>("all");

  const { list_code } = useListValidationQueryParams();

  const { data, isLoading } = useListPropertyValidations({
    filters: {
      list_code,
      month: "3",
      year: "2024",
    },
  });

  return (
    <>
      <ListValidationDashboardPanel
        isLoading={isLoading}
        currentFilter={filter}
        currentView={view}
        onChangeFilter={(filter) => {
          setFilter(filter);
        }}
        onChangeView={(view) => {
          setView(view);
        }}
        data={data?.results}
      />
      <ListValidationDashboardContent
        data={data?.results}
        currentFilter={filter}
      />
    </>
  );
};
