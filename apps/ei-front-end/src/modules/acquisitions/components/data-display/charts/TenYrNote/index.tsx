import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { GenericXYDateChart } from "@/commons/typings/charts";
import { getChartDateFromString } from "@/commons/utils/charts";
import { useFinancialMarketForwardCurves } from "@/modules/acquisitions/services/queries/market-analytics";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import { FiltersPayloadType, Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const DateBasedLineChart = dynamic(
  () => import("../GenericPercentageLineChart"),
  {
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
  }
);

interface TenYrNoteProps extends Pick<CardWithHeaderProps, "className"> {
  filters?: FiltersPayloadType;
}

export const TenYrNote: FC<TenYrNoteProps> = ({
  className,
  filters,
  ...props
}) => {
  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const {
    data = [],
    isLoading,
    isRefetching,
  } = useFinancialMarketForwardCurves({
    type: "10yr-note",
    ...filters,
  });

  const formattedData = useMemo(
    () =>
      (data as GenericXYDateChart[])
        .map((item) => {
          return getChartDateFromString({
            chartData: item,
            dateKey: "x",
          });
        })
        .sort((a, b) => a.x - b.x),
    [data]
  );

  const hasData = formattedData.length > 0;

  return (
    <CardWithHeader
      title="10-Yr"
      icon={<ChartBarSquareIcon />}
      className={getClasses()}
      isLoading={isLoading}
      isRefetching={isRefetching}
      {...props}
    >
      {hasData ? (
        <DateBasedLineChart
          id="acq-10-yr-note-chart"
          data={formattedData}
          hasZoom
          scaleValues
          zoomToBeginning
        />
      ) : (
        <NoDataOnChartMessage />
      )}
    </CardWithHeader>
  );
};
