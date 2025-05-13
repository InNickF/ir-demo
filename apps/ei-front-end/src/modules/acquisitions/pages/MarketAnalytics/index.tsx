import {
  Macroeconomics,
  RealEstateFundamentals,
  SupplyDemandAndRisk,
} from "@/commons/components/data-display/MarketAnalyticSections";
import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { MarketAnalyticsLayout } from "@/acquisitions/layouts/MarketAnalyticsLayout";
import { useDealsSummaryFilters } from "@/acquisitions/services/queries/filters";
import { useIndustrialGeography } from "@/acquisitions/services/queries/market-analytics";
import { marketAnalyticsPageMarketFilterAtom } from "@/acquisitions/store/marketAnalyticsAtoms";
import { useMoveMapBoxMapOnLatLngChange } from "@/commons/hooks/useMoveMapBoxMapOnLatLngChange";
import { NextPageWithLayout } from "@/commons/typings";
import { useAtom } from "jotai";
import { ReactElement, useMemo, useRef } from "react";
import { MapRef } from "react-map-gl";
import { MarketAnalyticsMarketSelect } from "./components/MarketAnalyticsMarketSelect";

const MarketAnalytics: NextPageWithLayout = () => {
  const mapRef = useRef<MapRef>(null);
  const [selectedMarket, setSelectedMarket] = useAtom(
    marketAnalyticsPageMarketFilterAtom
  );

  const { data: filters, isLoading: isLoadingFilters } =
    useDealsSummaryFilters();
  const marketFilters = useMemo(() => {
    return filters?.find((filter) => filter.key === "market") || null;
  }, [filters]);

  const {
    data: selectedMarketData,
    isLoading,
    isRefetching,
  } = useIndustrialGeography({
    market: "South Florida",
  });

  useMoveMapBoxMapOnLatLngChange({
    mapRef,
    latitude: selectedMarketData?.properties.centroid[1],
    longitude: selectedMarketData?.properties.centroid[0],
    animate: false,
  });

  return (
    <>
      <MarketAnalyticsMarketSelect
        selectedMarket={selectedMarket}
        options={marketFilters?.options}
        isLoadingFilters={isLoadingFilters}
        onChange={(market) => setSelectedMarket(market)}
        hasData={!!selectedMarketData}
        isLoading={isLoading}
        isRefetching={isRefetching}
      />
      <div
        className={
          !selectedMarketData || isRefetching
            ? "hidden"
            : "generic-entrance-animation"
        }
      >
        <RealEstateFundamentals
          ref={mapRef}
          market={selectedMarketData?.properties?.geography_name}
          isLoading={isLoading}
          isRefetching={isRefetching}
        />
        <SupplyDemandAndRisk
          market={selectedMarketData?.properties?.geography_name}
          zoomLatitude={selectedMarketData?.properties?.centroid[1]}
          zoomLongitude={selectedMarketData?.properties?.centroid[0]}
        />
        <Macroeconomics
          market={selectedMarketData?.properties?.geography_name}
        />
      </div>
    </>
  );
};

MarketAnalytics.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <MarketAnalyticsLayout>
        <AcqHead title="Market Analytics" />
        {page}
      </MarketAnalyticsLayout>
    </InAcqPermissionsLayout>
  );
};

export default MarketAnalytics;
