import { AssetHead } from "@/assets/components/general/AssetHead";
import { FundLayout } from "@/assets/layouts/FundLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { GeneralAssetsFilters } from "@/commons/components/data-entry/GeneralAssetsFilters";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { NextPageWithLayout } from "@/commons/typings";
import { defaultFundStatusFilteredOptions } from "@/commons/utils/filters";
import { useFilters } from "in-ui-react";
import { ReactElement, useState } from "react";
import { FundARChart } from "../../components/data-display/charts/ARChart";
import { GAVBreakdownChart } from "../../components/data-display/charts/GAVBreakdownChart";
import { LeaseExpirationsChart } from "../../components/data-display/charts/LeaseExpirationsChart";
import { ProjectedNOIGrowthChart } from "../../components/data-display/charts/ProjectedNOIGrowthChart";
import { PropertyGeography } from "../../components/data-display/PropertyGeography";
import { fundGavGroupByOptions } from "../../utils/funds";
import { getFundsURL } from "../../utils/redirects/funds-redirects";
import { FundAssets } from "./components/FundAssets";
import { FundComments } from "./components/FundComments";
import { FundCriticalDates } from "./components/FundCriticalDates";
import { FundPortfolioMetrics } from "./components/FundPortfolioMetrics";
import { FundStrategy } from "./components/FundStrategy";

type GavFilter = Record<
  | Exclude<typeof fundGavGroupByOptions[number], "assets">
  | "yardi_property_code",
  string
>;
const FundOverview: NextPageWithLayout = () => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const { filteredOptions, onApply } = useFilters({
    ...defaultFundStatusFilteredOptions,
    fund: fundId,
  });

  const [gavFilter, setGavFilter] = useState<GavFilter>(null);
  const setGavFilterForMap = (filter: GavFilter) => {
    setGavFilter((value) => {
      const prevValue =
        value?.status || value?.region || value?.yardi_property_code;
      const currValue =
        filter?.status || filter?.region || filter?.yardi_property_code;
      return prevValue === currValue ? null : filter;
    });
  };

  const computedFilters = { ...filteredOptions, fund: fundId };

  return (
    <div className="commons-grid">
      <GeneralAssetsFilters
        className="commons-grid-span-full"
        filteredOptions={computedFilters}
        onApply={onApply}
        disabledKeys={["fund"]}
      />
      <FundPortfolioMetrics
        filters={defaultFundStatusFilteredOptions}
        className="commons-grid-span-full"
      />
      <FundStrategy className="commons-grid-span-full" />
      <FundComments className="commons-grid-span-full" />
      <FundAssets
        filters={defaultFundStatusFilteredOptions}
        className="commons-grid-span-full"
      />

      <GAVBreakdownChart
        filters={defaultFundStatusFilteredOptions}
        className="commons-grid-span-4"
        onClick={setGavFilterForMap}
      />
      <PropertyGeography
        filters={{ ...defaultFundStatusFilteredOptions, ...gavFilter }}
        className="commons-grid-span-8"
      />
      <FundCriticalDates
        filters={defaultFundStatusFilteredOptions}
        className="commons-grid-span-6"
      />
      <ProjectedNOIGrowthChart
        filters={defaultFundStatusFilteredOptions}
        className="commons-grid-span-6"
      />
      <FundARChart
        className="commons-grid-span-6"
        filters={defaultFundStatusFilteredOptions}
      />
      <LeaseExpirationsChart
        filters={defaultFundStatusFilteredOptions}
        className="commons-grid-span-6"
      />
    </div>
  );
};

FundOverview.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Fund Overview" />
      <FundLayout>{page}</FundLayout>
    </InAssetsPermissionsLayout>
  );
};

export default FundOverview;
