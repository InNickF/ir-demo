import { Loader3D } from "@/commons/components/3d/Loader3D";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { stepBarChartDataModifier } from "@/commons/model-in/modifiers/utils/charts";
import { GenericFilterPayload } from "@/commons/typings";
import { useProjectedNoiGrowth } from "@/modules/assets/services/queries/portfolio-growth";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";

const ProjectedNoiGrowthBarChart = dynamic(
  () => import("./components/ProjectedNOIGrowthBarChart"),
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

interface ProjectedNOIGrowthChartProps {
  className?: string;
  filters?: GenericFilterPayload;
}

export const ProjectedNOIGrowthChart: FC<ProjectedNOIGrowthChartProps> = ({
  className,
  filters,
}) => {
  const {
    data: projectedNoiGrowth,
    isLoading,
    isRefetching,
  } = useProjectedNoiGrowth({
    ...filters,
    type: "projected-noi-growth",
  });

  const formattedData = stepBarChartDataModifier({
    data: projectedNoiGrowth,
  });

  return (
    <CardWithHeader
      title="Projected NOI Growth"
      icon={<BuildingOfficeIcon />}
      skeletonHeight={350}
      className={className}
      isLoading={isLoading}
      isRefetching={isRefetching}
      loaderKind="chart"
    >
      <ProjectedNoiGrowthBarChart
        id="assets-projected-noi-growth-chart"
        data={formattedData}
      />
    </CardWithHeader>
  );
};
