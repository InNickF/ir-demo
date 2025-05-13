import { AssetHead } from "@/assets/components/general/AssetHead";
import { AssetsLayout } from "@/assets/layouts/AssetsLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { dispatchGeneralFiltersAppliedEvent } from "@/commons/events/generalFiltersApplied";
import { getCurrentModuleAndPage } from "@/commons/model-in/configs/utils";
import { NextPageWithLayout } from "@/commons/typings";
import { Filters } from "in-ui-react";
import { ReactElement } from "react";
import { AssetListTableWidget } from "../../entities/asset/models/list/index.widgets";
import { usePagePropertyFilters } from "./hooks/usePagePropertyFilters";

const PropertiesPage: NextPageWithLayout = () => {
  const { UIFilters, filteredOptions, isLoadingFilters, onApply } =
    usePagePropertyFilters();

  const { view } = getCurrentModuleAndPage();

  return (
    <>
      <PageContainer className="relative z-control">
        <div className="flex justify-between">
          <Filters
            filters={UIFilters}
            filteredOptions={filteredOptions}
            onApply={(filters) => {
              dispatchGeneralFiltersAppliedEvent();
              onApply(filters);
            }}
            isLoading={isLoadingFilters}
            autoInitialFocus={false}
          />
        </div>
      </PageContainer>
      <div className="w-full">
        <AssetListTableWidget.Component
          filters={{
            fund: filteredOptions.fund,
            search: filteredOptions.search,
            status: filteredOptions.status,
          }}
          view={view}
        />
      </div>
    </>
  );
};

PropertiesPage.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Assets" />
      <AssetsLayout title="Assets">{page}</AssetsLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PropertiesPage;
