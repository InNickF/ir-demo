import { HistoricalCapRates } from "@/acquisitions/components/data-display/charts/CapRates";
import { MarketRentGrowthForecast } from "@/acquisitions/components/data-display/charts/MarketRentGrowthForecast";
import { MarketTrends } from "@/acquisitions/components/data-display/charts/MarketTrends";
import { CompFilters } from "@/acquisitions/components/data-entry/CompFilters";
import { Deal } from "@/acquisitions/typings/deals";
import {
  CompstackComp,
  FiltersByMarket,
  FiltersBySubMarket,
  GenericCompstackCompTrendChartElement,
} from "@/acquisitions/typings/market-analytics";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { useFilters } from "in-ui-react";
import { PropsWithChildren, forwardRef, useCallback, useState } from "react";
import { MapRef } from "react-map-gl";
import { MarketAnalyticsSectionContainer } from "../MarketAnalyticsSectionContainer";
import { CompsGeographyMap } from "./components/CompsGeographyMap";
import { ActiveCompIdState } from "./types";
interface RealEstateFundamentalsPropsBase
  extends PropsWithChildren,
    IsLoadingProp,
    IsRefetchingProp {
  deals?: Deal[];
  linkedComps?: CompstackComp[];
}
export interface RealEstateFundamentalsPropsByMarket
  extends RealEstateFundamentalsPropsBase,
    FiltersByMarket {}
export interface RealEstateFundamentalsPropsByDistance
  extends RealEstateFundamentalsPropsBase,
    FiltersByMarket,
    FiltersBySubMarket {}

export type RealEstateFundamentalsProps =
  | RealEstateFundamentalsPropsByMarket
  | RealEstateFundamentalsPropsByDistance;

export const RealEstateFundamentals = forwardRef<
  MapRef,
  RealEstateFundamentalsProps
>(
  (
    {
      deals = [],
      linkedComps = [],
      children,
      isLoading,
      isRefetching,
      ...props
    },
    mapRef
  ) => {
    const isFilteringBySubmarket = "submarket" in props;
    const [activeComp, setActiveComp] = useState<ActiveCompIdState>(null);
    const { filteredOptions, onApply } = useFilters();

    const onAmountBulletClick = useCallback(
      (item: GenericCompstackCompTrendChartElement) => {
        setActiveComp({
          activeCompId: item?.id,
          moveToComp: true,
        });
      },
      []
    );

    return (
      <MarketAnalyticsSectionContainer title="Real Estate Fundamentals">
        <CompFilters
          filteredOptions={filteredOptions}
          onApply={onApply}
          className="mb-3"
        />
        <div className="commons-grid">
          {isFilteringBySubmarket ? (
            <>
              <MarketTrends
                className="commons-grid-span-6"
                submarket={props?.submarket}
                onAmountBulletClick={onAmountBulletClick}
                filters={{}}
              />
              <CompsGeographyMap
                ref={mapRef}
                className="commons-grid-span-6"
                submarket={props?.submarket}
                linkedComps={linkedComps}
                deals={deals}
                activeComp={activeComp}
                setActiveComp={setActiveComp}
                filters={{}}
              />
              <MarketRentGrowthForecast
                className="commons-grid-span-6"
                submarket={props?.submarket}
                filters={{}}
              />
            </>
          ) : (
            <>
              <MarketTrends
                market={props?.market}
                className="commons-grid-span-6"
                onAmountBulletClick={onAmountBulletClick}
                filters={{}}
              />
              <CompsGeographyMap
                ref={mapRef}
                className="commons-grid-span-6"
                market={props?.market}
                linkedComps={linkedComps}
                deals={deals}
                isLoading={isLoading}
                isRefetching={isRefetching}
                activeComp={activeComp}
                setActiveComp={setActiveComp}
                filters={{}}
              />
              <MarketRentGrowthForecast
                className="commons-grid-span-6"
                market={props?.market}
                filters={{}}
              />
            </>
          )}
          <HistoricalCapRates
            className="commons-grid-span-6"
            market={props?.market}
          />
          {children}
        </div>
      </MarketAnalyticsSectionContainer>
    );
  }
);

RealEstateFundamentals.displayName = "RealEstateFundamentals";
