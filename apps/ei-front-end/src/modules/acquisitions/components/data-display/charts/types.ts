import {
  FiltersByMarket,
  FiltersBySubMarket,
  GenericCompstackCompTrendChartElement,
} from "@/acquisitions/typings/market-analytics";
import { GenericFilterPayload } from "@/commons/typings";
import { CardProps, FiltersPayloadType } from "in-ui-react";

export interface CompstackCompsTrendChartPropsBase extends CardProps {
  onAmountBulletClick?: (data: GenericCompstackCompTrendChartElement) => void;
  headerActions?: JSX.Element;
  title?: string;
}
export interface CompstackCompsTrendChartPropsByMarket
  extends CompstackCompsTrendChartPropsBase,
    FiltersByMarket {
  filters?: GenericFilterPayload;
}
export interface CompstackCompsTrendChartPropsBySubmarket
  extends CompstackCompsTrendChartPropsBase,
    FiltersBySubMarket {
  filters?: GenericFilterPayload;
}
export type CompstackCompsTrendChartProps =
  | CompstackCompsTrendChartPropsByMarket
  | CompstackCompsTrendChartPropsBySubmarket;

interface MarketAnalyticsChartPropsBase {
  headerActions?: JSX.Element;
  className?: string;
  filters?: FiltersPayloadType;
}

export type MarketAnalyticsChartProps =
  | (MarketAnalyticsChartPropsBase & FiltersByMarket)
  | (MarketAnalyticsChartPropsBase & FiltersBySubMarket);
