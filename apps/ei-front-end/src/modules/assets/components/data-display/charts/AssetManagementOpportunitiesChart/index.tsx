import { Loader3D } from "@/commons/components/3d/Loader3D";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useManagementOpportunities } from "@/modules/assets/services/queries/asset-growth";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";

const AssetManagementChart = dynamic(
  () => import("./components/AssetManagementChart"),
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

interface AssetManagementOpportunitiesChartProps {
  className?: string;
  fund: string;
}

export const AssetManagementOpportunitiesChart: FC<
  AssetManagementOpportunitiesChartProps
> = ({ className, fund }) => {
  const { data, isLoading } = useManagementOpportunities({
    fund,
    type: "asset-opportunities",
  });

  return (
    <CardWithHeader
      title="Asset Opportunities"
      icon={<PresentationChartBarIcon />}
      className={className}
      isLoading={isLoading}
    >
      <AssetManagementChart id="assets-asset-management-chart" data={data} />
    </CardWithHeader>
  );
};
