import { GenericFilterPayload } from "@/commons/typings";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useProjectedNoiGrowth } from "@/modules/assets/services/queries/portfolio-growth";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC } from "react";
import { Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const ProjectedNoiGrowthChart = dynamic(
  () => import("./components/ProjectedNoiGrowthChart"),
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

interface ProjectedNoiGrowthProps {
  className?: string;
  filters?: GenericFilterPayload;
}

export const ProjectedNoiGrowth: FC<ProjectedNoiGrowthProps> = ({
  className,
  filters,
}) => {
  const {
    data: projectedNoiGrowth,
    isLoading,
    isRefetching,
  } = useProjectedNoiGrowth(filters || {});
  return (
    <CardWithHeader
      title="Projected NOI Growth"
      icon={<BuildingOfficeIcon />}
      skeletonHeight={350}
      className={className}
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      <ProjectedNoiGrowthChart
        id="assets-projected-noi-growth-chart"
        data={projectedNoiGrowth}
      />
    </CardWithHeader>
  );
};
