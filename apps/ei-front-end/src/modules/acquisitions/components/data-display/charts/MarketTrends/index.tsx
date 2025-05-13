import {
  FiltersByMarket,
  FiltersBySubMarket,
  GenericCompstackCompTrendChartElement,
} from "@/acquisitions/typings/market-analytics";
import {
  COMPSTACK_COMP_TYPES,
  CompstackCompTypeWithAllKeyLabelValue,
  compstackCompTypeLabelValue,
} from "@/acquisitions/utils";
import { GenericFilterPayload } from "@/commons/typings";
import { FC, memo, useMemo, useState } from "react";
import { CompstackLandCompsTrendChart } from "../CompstackLandCompsTrendChart";
import { CompstackLeaseCompsTrendChart } from "../CompstackLeaseCompsTrendChart";
import { CompstackSaleCompsTrendChart } from "../CompstackSaleCompsTrendChart";
import { CompstackCompsTrendChartProps } from "../types";
import { MarketTrendsFilter } from "./components/MarketTrendsFilter";

interface MarketTrendsPropsBase {
  onAmountBulletClick?: (data: GenericCompstackCompTrendChartElement) => void;
  className?: string;
  filters?: GenericFilterPayload;
}
interface MarketTrendsPropsByMarket
  extends FiltersByMarket,
    MarketTrendsPropsBase {}
interface MarketTrendsPropsBySubmarket
  extends FiltersBySubMarket,
    MarketTrendsPropsBase {}

type MarketTrendsProps =
  | MarketTrendsPropsByMarket
  | MarketTrendsPropsBySubmarket;

const MarketTrendCharts: {
  [Key in typeof COMPSTACK_COMP_TYPES[number]]: FC<CompstackCompsTrendChartProps>;
} = {
  land: CompstackLandCompsTrendChart,
  lease: CompstackLeaseCompsTrendChart,
  sale: CompstackSaleCompsTrendChart,
};

export const MarketTrends: FC<MarketTrendsProps> = memo(
  ({ onAmountBulletClick, className, filters, ...props }) => {
    const [chartFilter, setChartFilter] =
      useState<CompstackCompTypeWithAllKeyLabelValue>(
        compstackCompTypeLabelValue[1]
      );
    const isFilteringByMarket = "market" in props;
    const CurrentChart = useMemo(() => {
      const isAllCharts = chartFilter.value === "all";
      if (isAllCharts) {
        return null;
      }
      return MarketTrendCharts[chartFilter.value];
    }, [chartFilter]);

    return chartFilter.value === "all" && !CurrentChart ? (
      <>
        {COMPSTACK_COMP_TYPES.map((compType, index) => {
          const CompstackCompTrendChart = MarketTrendCharts[compType];
          return isFilteringByMarket ? (
            <CompstackCompTrendChart
              key={compType}
              className={className}
              headerActions={
                index === 0 ? (
                  <MarketTrendsFilter
                    onFiltering={(option) => setChartFilter(option)}
                    options={compstackCompTypeLabelValue}
                    value={chartFilter}
                  />
                ) : null
              }
              onAmountBulletClick={onAmountBulletClick}
              market={props?.market}
              filters={filters}
            />
          ) : (
            <CompstackCompTrendChart
              key={compType}
              className={className}
              headerActions={
                index === 0 ? (
                  <MarketTrendsFilter
                    onFiltering={(option) => setChartFilter(option)}
                    options={compstackCompTypeLabelValue}
                    value={chartFilter}
                  />
                ) : null
              }
              onAmountBulletClick={onAmountBulletClick}
              submarket={props?.submarket}
              filters={filters}
            />
          );
        })}
      </>
    ) : isFilteringByMarket ? (
      <CurrentChart
        title="Market Trends"
        className={className}
        headerActions={
          <MarketTrendsFilter
            onFiltering={(option) => setChartFilter(option)}
            options={compstackCompTypeLabelValue}
            value={chartFilter}
          />
        }
        onAmountBulletClick={onAmountBulletClick}
        market={props?.market}
        filters={filters}
      />
    ) : (
      <CurrentChart
        title="Market Trends"
        className={className}
        headerActions={
          <MarketTrendsFilter
            onFiltering={(option) => setChartFilter(option)}
            options={compstackCompTypeLabelValue}
            value={chartFilter}
          />
        }
        onAmountBulletClick={onAmountBulletClick}
        submarket={props?.submarket}
        filters={filters}
      />
    );
  }
);

MarketTrends.displayName = "MarketTrends";
