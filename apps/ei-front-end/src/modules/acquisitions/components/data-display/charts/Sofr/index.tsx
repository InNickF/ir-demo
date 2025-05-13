import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { useFinancialMarketForwardCurves } from "@/modules/acquisitions/services/queries/market-analytics";
import { FinancialMarketForwardCurvesSOFRCharts } from "@/modules/acquisitions/typings/market-analytics";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import { FiltersPayloadType, Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const SofrChart = dynamic(() => import("./components/SofrChart"), {
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

interface SofrProps
  extends Pick<CardWithHeaderProps, "headerActions" | "className"> {
  filters?: FiltersPayloadType;
}

export const Sofr: FC<SofrProps> = ({ headerActions, className, filters }) => {
  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { data, isLoading, isRefetching } = useFinancialMarketForwardCurves({
    type: "sofr",
    ...filters,
  });

  const sofrData = data as FinancialMarketForwardCurvesSOFRCharts;

  const hasData = sofrData?.some((curve) => curve.value.length > 0);

  return (
    <CardWithHeader
      title="SOFR"
      icon={<ChartBarSquareIcon />}
      headerActions={headerActions}
      className={getClasses()}
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      {hasData ? (
        <SofrChart id="acq-sofr-chart" data={sofrData} />
      ) : (
        <NoDataOnChartMessage />
      )}
    </CardWithHeader>
  );
};
