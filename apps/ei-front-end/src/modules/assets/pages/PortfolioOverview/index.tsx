import { AssetHead } from "@/assets/components/general/AssetHead";
import { FundsLayout } from "@/assets/layouts/FundsLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { dispatchGeneralFiltersAppliedEvent } from "@/commons/events/generalFiltersApplied";
import { getCurrentModuleAndPage } from "@/commons/model-in/configs/utils";
import { NextPageWithLayout } from "@/commons/typings";
import { Filters } from "in-ui-react";
import { ReactElement } from "react";
import { PropertyGeography } from "../../components/data-display/PropertyGeography";
import { FundListTableWidget } from "../../entities/fund/models/list/index.widgets";
import { useFundsPageFilters } from "./hooks/useFundsPageFilters";

const PortfolioOverviewPage: NextPageWithLayout = () => {
  const {
    UIFilters,
    isLoadingFilters,
    onApply,
    defaultFilters,
    filteredOptions,
  } = useFundsPageFilters({
    ignoredFilters: ["search"],
  });

  const { view } = getCurrentModuleAndPage();

  return (
    <>
      <PageContainer className="relative z-control">
        <div className="commons-grid">
          <div className="flex justify-between commons-grid-span-full">
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
          <FundListTableWidget.Component
            filters={{ status: defaultFilters?.status }}
            className="commons-grid-span-full"
            view={view}
          />
          <PropertyGeography
            className="commons-grid-span-full"
            filters={defaultFilters}
          />
        </div>
      </PageContainer>
    </>
  );
};

PortfolioOverviewPage.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Portfolio" />
      <FundsLayout title="Portfolio">{page}</FundsLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PortfolioOverviewPage;
