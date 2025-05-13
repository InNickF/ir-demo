import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { ButtonGroup, Empty, Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import { useUtilityScoresButtonGroup } from "./hooks/useUtilityScoresButtonGroup";
import { UtilityScoreStakedChartProps } from "./props";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const UtilityScoreStakedChart = dynamic(() => import("./components/Chart"), {
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

export const UtilityScoreStakedChartWrapper: FC<
  UtilityScoreStakedChartProps
> = ({ id, data = [] }) => {
  const { selectedUtilityScore, utilityScoresItems } =
    useUtilityScoresButtonGroup();

  const chartData = useMemo(() => {
    const sortData = (
      data: UtilityScoreStakedChartProps["data"]
    ): UtilityScoreStakedChartProps["data"] => {
      return data
        .filter((item) => item.value !== 0)
        .map((item) => ({
          ...item,
          label: convertToTitleCase(item.label),
        }))
        .sort((a, b) => {
          // Both positive
          if (a.value >= 0 && b.value >= 0) {
            return a.value - b.value;
          }
          // Both negative
          if (a.value < 0 && b.value < 0) {
            return a.value - b.value;
          }
          // a is negative and b is positive
          if (a.value < 0 && b.value >= 0) {
            return -1;
          }
          // a is positive and b is negative
          if (a.value >= 0 && b.value < 0) {
            return 1;
          }
          return 0;
        })
        .reverse();
    };

    const topNumbers = (
      data: UtilityScoreStakedChartProps["data"]
    ): UtilityScoreStakedChartProps["data"] => {
      const top = 3;
      const positiveItems = data
        .filter((item) => item.value >= 0)
        .slice(0, top);
      const negativeItems = data.filter((item) => item.value < 0).slice(-top);

      return [...positiveItems, ...negativeItems];
    };

    const sortedData = sortData(data);

    return selectedUtilityScore === "all" ? sortedData : topNumbers(sortedData);
  }, [data, selectedUtilityScore]);

  return data.length ? (
    <>
      <div className="flex justify-center w-full">
        <ButtonGroup items={utilityScoresItems} active={selectedUtilityScore} />
      </div>
      <UtilityScoreStakedChart data={chartData} id={id} />
    </>
  ) : (
    <Empty className="w-full h-full flex justify-center items-center" />
  );
};
