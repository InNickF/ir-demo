import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useGetQuarterlyPortfolio } from "@/modules/assets/services/queries/portfolio";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC } from "react";
import "./styles.css";
import { GenericFilterPayload } from "@/commons/typings";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const StackingQuarterlyChart = dynamic(
  () => import("./component/StackedQuarterlyChart"),
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

interface QuarterlyChartProps {
  filters: GenericFilterPayload;
  fundFilter?: string;
  className?: string;
}

export const QuarterlyChart: FC<QuarterlyChartProps> = ({
  filters,
  className,
}) => {
  const prefix = "asset-portfolio-page__chart";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { data, isLoading, isRefetching } = useGetQuarterlyPortfolio(
    filters,
    "region"
  );
  return (
    <CardWithHeader
      className={getClasses()}
      icon={<ChartPieIcon />}
      title="Quarterly Valuation Growth"
      isLoading={isLoading}
      isRefetching={isRefetching}
      skeletonHeight={300}
    >
      <StackingQuarterlyChart id="stacking-quarterly-chart" data={data} />
    </CardWithHeader>
  );
};
