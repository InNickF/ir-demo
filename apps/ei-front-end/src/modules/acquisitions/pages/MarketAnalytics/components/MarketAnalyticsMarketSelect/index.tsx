import {
  GenericLabelValueObject,
  IsLoadingProp,
  IsRefetchingProp,
} from "@/commons/typings";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { Card, Heading, Loader, Select } from "in-ui-react";
import { FC } from "react";
import "./styles.css";
interface NoMarketSelectedMessageProps extends IsLoadingProp, IsRefetchingProp {
  selectedMarket: GenericLabelValueObject;
  onChange: (market: GenericLabelValueObject) => void;
  isLoadingFilters?: boolean;
  options?: GenericLabelValueObject[];
  hasData: boolean;
}
export const MarketAnalyticsMarketSelect: FC<NoMarketSelectedMessageProps> = ({
  isLoading,
  selectedMarket,
  onChange,
  isLoadingFilters,
  options,
  hasData,
  isRefetching,
}) => {
  const getMainMarketSelectClasses = (): string => {
    const classes = [
      "acq-market-analytics-page__market-select-main-select",
      "generic-entrance-animation",
    ];
    !selectedMarket?.value &&
      classes.push(
        "acq-market-analytics-page__market-select-main-select--hidden"
      );
    return classes.join(" ");
  };

  return (
    <>
      <section className="acq-market-analytics-page__market-select-first-container">
        <Select
          label="Chosen market"
          value={selectedMarket}
          className={getMainMarketSelectClasses()}
          onChange={(market) => onChange(market)}
          options={options || []}
          loading={isLoadingFilters}
        />
        <MarketAnalyticsMarketSelectMiniLoader
          market={selectedMarket?.value}
          className={
            selectedMarket?.value && isRefetching ? undefined : "hidden"
          }
        />
      </section>
      <section className="acq-market-analytics-page__market-select-second-container">
        {!selectedMarket?.value ? (
          <>
            <Heading kind="h4">Please select a market to continue</Heading>
            <Select
              label="Market"
              className="acq-market-analytics-page__market-select-secondary-select"
              value={selectedMarket}
              onChange={(market) => onChange(market)}
              options={options || []}
              loading={isLoadingFilters}
            />
          </>
        ) : null}

        {isLoading && !hasData && selectedMarket?.value ? (
          <MarketAnalyticsMarketSelectLoader market={selectedMarket?.value} />
        ) : null}

        {!hasData || isLoading || isRefetching ? (
          <div className="acq-market-analytics-page__market-select-second-container__decoration-grid generic-entrance-animation">
            {Array.from({ length: 4 }, (_, i) => (
              <Card
                key={i}
                className="acq-market-analytics-page__market-select-second-container__decoration-grid__card"
              />
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
};

interface MarketAnalyticsMarketSelectLoaderProps {
  market: Deal["market"];
}
const MarketAnalyticsMarketSelectLoader: FC<
  MarketAnalyticsMarketSelectLoaderProps
> = ({ market }) => {
  return (
    <>
      <Heading className="generic-entrance-animation" kind="h4">
        Loading initial {market} market data.
      </Heading>
      <Loader className="my-4 generic-entrance-animation" />
    </>
  );
};

const MarketAnalyticsMarketSelectMiniLoader: FC<
  MarketAnalyticsMarketSelectLoaderProps & { className?: string }
> = ({ market, className }) => {
  const getClasses = (): string => {
    const classes = [
      "flex",
      "gap-2",
      "items-center",
      "mt-6",
      "generic-entrance-animation",
    ];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <div className={getClasses()}>
      <Loader />
      <p>Loading initial {market} market data.</p>
    </div>
  );
};
