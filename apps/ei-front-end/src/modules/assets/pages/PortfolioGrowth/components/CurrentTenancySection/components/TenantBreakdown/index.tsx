import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { TenantBreakdown as ITenantBreakdown } from "@/modules/assets/typings/asset-growth";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { ButtonGroup, Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { TenancyCalculationType } from "../..";
import { TenantBreakdownTable } from "./components/TenantBreakdownTable";
import { useTenantBreakdownFilters } from "./hooks/useTenantBreakdownFilter";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const TenantBreakdownChart = dynamic(
  () => import("./components/TenantBreakdownChart"),
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

interface TenantBreakdownProps extends IsLoadingProp, IsRefetchingProp {
  className?: string;
  data: ITenantBreakdown[];
  calculationType?: TenancyCalculationType;
}

export const TenantBreakdown: FC<TenantBreakdownProps> = ({
  className,
  isLoading,
  isRefetching,
  data,
  calculationType = "rentable_area",
}) => {
  const { tenantBreakdownFilter, tenantBreakdownItems } =
    useTenantBreakdownFilters();
  return (
    <CardWithHeader
      title="Tenant Breakdown"
      icon={<BuildingOfficeIcon />}
      headerActions={
        <ButtonGroup
          active={tenantBreakdownFilter}
          items={tenantBreakdownItems}
        />
      }
      bodyPadding={false}
      className={className}
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      {tenantBreakdownFilter === "graph" ? (
        <TenantBreakdownChart
          calculationType={calculationType}
          id="tenant-breakdown-chart"
          data={data}
        />
      ) : (
        <TenantBreakdownTable calculationType={calculationType} data={data} />
      )}
    </CardWithHeader>
  );
};
