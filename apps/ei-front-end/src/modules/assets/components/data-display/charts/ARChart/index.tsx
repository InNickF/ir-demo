import { Loader3D } from "@/commons/components/3d/Loader3D";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { useButtonGroupFilters } from "@/commons/hooks/useButtonGroupFilters";
import { GetARChartFilters } from "@/modules/assets/services/api/portfolio";
import { useARChart } from "@/modules/assets/services/queries/portfolio";
import { AR_TENANT_TYPES } from "@/modules/assets/utils";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { ButtonGroup, Checkbox, Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC, useState } from "react";

const ARLineChart = dynamic(() => import("./components/ARLineChart"), {
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

interface FundARChartProps
  extends Omit<CardWithHeaderProps, "icon" | "children" | "title"> {
  filters: GetARChartFilters;
}

export const FundARChart: FC<FundARChartProps> = ({
  filters,
  className,
  ...props
}) => {
  const [isPrepayActive, setIsPrepayActive] = useState(true);

  const { currentActiveFilter, items } = useButtonGroupFilters({
    filters: [...AR_TENANT_TYPES],
  });
  const { data, isLoading, isRefetching } = useARChart({
    ...filters,
    tenant_type: currentActiveFilter,
  });

  const getClasses = (): string => {
    const classes = ["asset-portfolio-page__grid-half"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader
      title="Accounts Receivable"
      icon={<ChartBarIcon />}
      bodyPadding={false}
      isLoading={isLoading}
      isRefetching={isRefetching}
      className={getClasses()}
      hasDataToShow={!!data?.length}
      loaderKind="chart"
      headerActions={
        <>
          <Checkbox
            checked={isPrepayActive}
            onChange={() => {
              setIsPrepayActive((prev) => !prev);
            }}
            label="Prepayment"
          />
          <ButtonGroup
            active={currentActiveFilter}
            items={items}
            size="small"
          />
        </>
      }
      {...props}
    >
      <ARLineChart
        id="assets-ar-fund-chart"
        data={data}
        withPrepay={isPrepayActive}
      />
    </CardWithHeader>
  );
};
