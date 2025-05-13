import { SupplyConstrainedScore } from "@/acquisitions/components/data-display/charts/SupplyConstrainedScore";
import { SupplyConstraints } from "@/acquisitions/components/data-display/charts/SupplyConstraints";
import { useDateFilters } from "@/commons/hooks/useDateFilters";
import { Deal } from "@/modules/acquisitions/typings/deals";
import {
  FiltersByDistance,
  FiltersByMarket,
  FiltersBySubMarket,
} from "@/modules/acquisitions/typings/market-analytics";
import { Filters, useFilters } from "in-ui-react";
import { FC } from "react";
import { MarketAnalyticsSectionContainer } from "../MarketAnalyticsSectionContainer";
import { DynamicCharts } from "./components/DynamicCharts";
import { MarketHeatmap } from "./components/MarketHeatmap";

interface SupplyDemandAndRiskBaseProps {
  zoomLatitude?: number;
  zoomLongitude?: number;
  dealId?: Deal["id"];
}

interface SupplyDemandAndRiskPropsByDistance
  extends FiltersByDistance,
    SupplyDemandAndRiskBaseProps,
    FiltersBySubMarket {}

type SupplyDemandAndRiskProps =
  | (FiltersByMarket & SupplyDemandAndRiskBaseProps)
  | (FiltersByMarket & SupplyDemandAndRiskPropsByDistance);

export const SupplyDemandAndRisk: FC<SupplyDemandAndRiskProps> = ({
  market,
  dealId,
  zoomLatitude,
  zoomLongitude,
  ...props
}) => {
  const { filteredOptions, onApply } = useFilters({
    date: "",
  });
  const dateFilters = useDateFilters({
    initialFilters: [],
    isClearable: true,
    unDeletable: true,
    showApplyButton: true,
  });

  const isFilteringBySubmarket = "submarket" in props;

  return (
    <MarketAnalyticsSectionContainer title="Supply, Demand, and Risk">
      <Filters
        className="mb-3"
        filters={dateFilters}
        filteredOptions={filteredOptions}
        onApply={onApply}
        hideAddButton
        kind="glass"
      />
      <div className="commons-grid">
        <SupplyConstraints
          className="commons-grid-span-6"
          market={market}
          filters={{}}
        />
        <SupplyConstrainedScore
          className="commons-grid-span-6"
          market={market}
          filters={{}}
        />
        {isFilteringBySubmarket ? (
          <>
            <MarketHeatmap
              className="commons-grid-span-full"
              dealId={dealId}
              latitude={props?.latitude}
              longitude={props?.longitude}
              submarket={props?.submarket}
              zoomLatitude={zoomLatitude}
              zoomLongitude={zoomLongitude}
            />
            <DynamicCharts
              className="commons-grid-span-full"
              submarket={props?.submarket}
              filters={{}}
            />
          </>
        ) : (
          <>
            <MarketHeatmap
              className="commons-grid-span-full"
              dealId={dealId}
              market={market}
              zoomLatitude={zoomLatitude}
              zoomLongitude={zoomLongitude}
            />
            <DynamicCharts
              className="commons-grid-span-full"
              market={market}
              filters={{}}
            />
          </>
        )}
      </div>
    </MarketAnalyticsSectionContainer>
  );
};
