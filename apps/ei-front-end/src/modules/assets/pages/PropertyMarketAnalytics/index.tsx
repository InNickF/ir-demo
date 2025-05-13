import { AssetHead } from "@/assets/components/general/AssetHead";
import { usePropertyIdFromQueryParams } from "@/assets/hooks/usePropertyIdFromQueryParams";
import { AssetLayout } from "@/assets/layouts/AssetLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { useProperty } from "@/assets/services/queries/properties";
import {
  Macroeconomics,
  RealEstateFundamentals,
  SupplyDemandAndRisk,
} from "@/commons/components/data-display/MarketAnalyticSections";
import { useMoveMapBoxMapOnLatLngChange } from "@/commons/hooks/useMoveMapBoxMapOnLatLngChange";
import { NextPageWithLayout } from "@/commons/typings";
import { useIndustrialGeography } from "@/modules/acquisitions/services/queries/market-analytics";
import { ReactElement, useRef } from "react";
import { MapRef } from "react-map-gl";

const PropertyMarketAnalytics: NextPageWithLayout = () => {
  const propertyId = usePropertyIdFromQueryParams();
  const {
    data: property,
    isLoading: isLoadingProperty,
    isRefetching: isRefetchingProperty,
  } = useProperty({
    propertyId: propertyId,
  });

  const {
    data: selectedMarketData,
    isLoading: isLoadingMarket,
    isRefetching: isRefetchingMarket,
  } = useIndustrialGeography({
    market: property?.market_name,
  });

  const mapRef = useRef<MapRef>(null);
  useMoveMapBoxMapOnLatLngChange({
    mapRef,
    latitude: selectedMarketData?.properties.centroid[1],
    longitude: selectedMarketData?.properties.centroid[0],
    animate: false,
  });

  const isLoading = isLoadingProperty || isLoadingMarket;
  const isRefetching = isRefetchingProperty || isRefetchingMarket;

  return (
    <>
      <RealEstateFundamentals
        ref={mapRef}
        market={selectedMarketData?.properties?.geography_name}
        submarket={property?.submarket_name}
        isLoading={isLoading}
        isRefetching={isRefetching}
      />
      <SupplyDemandAndRisk
        market={selectedMarketData?.properties?.geography_name}
        zoomLatitude={selectedMarketData?.properties?.centroid[1]}
        zoomLongitude={selectedMarketData?.properties?.centroid[0]}
      />
      <Macroeconomics
        market={property?.market_name}
        isLoading={isLoading}
        isRefetching={isRefetching}
      />
    </>
  );
};

PropertyMarketAnalytics.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Property - Market Analytics" />
      <AssetLayout>{page}</AssetLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PropertyMarketAnalytics;
