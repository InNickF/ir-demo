import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { useHistoricalCapRates } from "@/modules/acquisitions/services/queries/market-analytics";
import {
  FiltersByMarket,
  FiltersBySubMarket,
} from "@/modules/acquisitions/typings/market-analytics";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { CardProps, Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import "./styles.css";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const CapRatesChart = dynamic(() => import("./components/CapRatesChart"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full justify-center items-center h-96">
      <Loader3D
        kind="chart"
        style={{
          minHeight: 350,
        }}
        isLoading
        localIsLoading
        onChangeIsLoading={() => null}
      />
    </div>
  ),
});

interface CapRatesPropsBase extends CardProps {
  filters?: GenericFilterPayload;
}
interface CapRatesPropsByMarket extends FiltersByMarket, CapRatesPropsBase {}
interface CapRatesPropsBySubMarket
  extends FiltersBySubMarket,
    CapRatesPropsBase {}

type CapRatesProps = CapRatesPropsByMarket | CapRatesPropsBySubMarket;
export const HistoricalCapRates: FC<CapRatesProps> = ({
  filters,
  ...props
}) => {
  const isFilteringByMarket = "market" in props;
  const filtersBy = isFilteringByMarket
    ? { market: props?.market }
    : {
        submarket: props?.submarket,
      };

  const { data, isLoading, isRefetching } = useHistoricalCapRates({
    ...filtersBy,
    ...filters,
  });

  const hasData = data?.length;

  return (
    <CardWithHeader
      title="Cap Rates"
      icon={<ChartBarSquareIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      {...props}
    >
      {hasData ? (
        <CapRatesChart id="acq-cap-rates-chart" data={data} />
      ) : (
        <NoDataOnChartMessage />
      )}
    </CardWithHeader>
  );
};
