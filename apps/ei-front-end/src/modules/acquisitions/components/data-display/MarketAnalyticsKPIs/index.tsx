import { HeaderKpi } from "@/commons/components/layout/HeaderKpi";
import { useMarketAnalyticsKPIs } from "@/acquisitions/services/queries/market-analytics";
import { IsLoadingProp } from "@/commons/typings";
import {
  numberAbbreviation,
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import {
  FiltersByMarket,
  FiltersBySubMarket,
} from "@/modules/acquisitions/typings/market-analytics";
import { FC } from "react";

type MarketAnalyticsKPIsBaseProps = IsLoadingProp;
type MarketAnalyticsKPIsPropsByMarket = MarketAnalyticsKPIsBaseProps &
  FiltersByMarket;
type MarketAnalyticsKPIsPropsBySubMarket = MarketAnalyticsKPIsBaseProps &
  FiltersBySubMarket;

type MarketAnalyticsKPIsProps =
  | MarketAnalyticsKPIsPropsByMarket
  | MarketAnalyticsKPIsPropsBySubMarket;
export const MarketAnalyticsKPIs: FC<MarketAnalyticsKPIsProps> = ({
  isLoading,
  ...props
}) => {
  const isByMarket = "market" in props;
  const filtersBy = isByMarket
    ? { market: props?.market }
    : { submarket: props?.submarket };

  const {
    data: KPIs,
    isLoading: isKPIsLoading,
    isRefetching,
  } = useMarketAnalyticsKPIs(filtersBy);

  const market = isByMarket ? props?.market : props?.submarket;
  const isSomethingLoading =
    isLoading || isKPIsLoading || isRefetching || !market;

  return (
    <>
      <HeaderKpi
        title="Market"
        value={market}
        isLoading={isSomethingLoading}
        ellipsis
        ellipsisLength={15}
      />
      <HeaderKpi
        title={
          <span>
            Current
            <br />
            Vacancy
          </span>
        }
        value={numberToPercent(KPIs?.current_vacancy)}
        isLoading={isSomethingLoading}
      />
      <HeaderKpi
        title={
          <span>
            Market
            <br />
            Size
          </span>
        }
        value={numberAbbreviation({
          value: KPIs?.market_size,
        })}
        isLoading={isSomethingLoading}
      />
      <HeaderKpi
        title={
          <span>
            Construction
            <br />/ Market Size
          </span>
        }
        value={numberToPercent(KPIs?.construction_size, true)}
        isLoading={isSomethingLoading}
      />
      <HeaderKpi
        title={
          <span>
            Current
            <br />
            Market Rent
          </span>
        }
        value={numberToDollar({
          value: KPIs?.current_market_rent,
        })}
        isLoading={isSomethingLoading}
      />
    </>
  );
};
