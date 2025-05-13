import { FundLenderByLtv } from "@/modules/debt/typings/fund";
import {
  Card,
  CardProps,
  Loader,
  LoadingLine,
  Skeleton,
  useTheme,
} from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { maturityColors } from "../../utils";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const RiskRefiBubbleChart = dynamic(
  () => import("./components/RiskRefiBubbleChart"),
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

interface RiskRefiChartCardProps extends CardProps {
  data: FundLenderByLtv[];
  sortBy: string;
  isLoading?: boolean;
  isRefetching?: boolean;
}

export const RiskRefiChartCard: FC<CardProps & RiskRefiChartCardProps> = ({
  data,
  sortBy,
  isLoading = false,
  isRefetching,
  ...props
}) => {
  const prefix = "debt-risk-refi-chart-card";
  const { theme } = useTheme();

  const legendColors = maturityColors(theme.includes("dark"));

  const bubbleChartLegends = [
    "0-6 Months",
    "7-12 Months",
    "13-24 Months",
    ">24 Months",
  ];
  return (
    <Card className={prefix} {...props}>
      <LoadingLine persist isActive={isRefetching} />
      {isLoading ? (
        <>
          <Skeleton>
            <Skeleton.Avatar shape="squared" className="w-full h-[480px]" />
          </Skeleton>
          <Skeleton>
            <Skeleton.Avatar shape="squared" className="w-full h-[20px]" />
          </Skeleton>
        </>
      ) : (
        <>
          <RiskRefiBubbleChart
            data={data}
            sortBy={sortBy}
            id="debt-risk-refi-bubble-chart"
          />
          <div className="flex justify-center gap-4">
            {bubbleChartLegends.map((legend, index) => (
              <div key={legend} className={`${prefix}-legend-container`}>
                <span
                  className={`${prefix}-legend-dot`}
                  style={{ backgroundColor: legendColors[index] }}
                ></span>
                <p className={`${prefix}-label`}>{legend}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};
