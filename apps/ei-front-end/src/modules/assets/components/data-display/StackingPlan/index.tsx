import { Loader3D } from "@/commons/components/3d/Loader3D";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import {
  numberToDollar,
  numberToScaledPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { GetAssetStakingPlanFilters } from "@/modules/assets/services/api/properties";
import { useGetAssetStackingPlan } from "@/modules/assets/services/queries/properties";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";

interface StackingPlanProps {
  filters: GetAssetStakingPlanFilters;
  className?: string;
}

const StackingPlanChart = dynamic(
  () =>
    import(
      "@/assets/components/data-display/StackingPlan/components/StackingPlanChart"
    ),
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

export const StackingPlan: FC<StackingPlanProps> = ({ className, filters }) => {
  const { data, isLoading, isRefetching } = useGetAssetStackingPlan({
    filters,
  });

  const prefix = "asset-portfolio-page__stacking-plan";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const transformedData = data?.map((item) => ({
    ...item,
    unit_codes: item?.unit_codes || "N/A",
    last_updated_market_prices: item?.last_updated_market_prices || "N/A",
    annual_rent_psf: item?.annual_rent_psf?.toFixed(2),
    market_rent: numberToDollar({ value: item.market_rent }),
    market_percentage: numberToScaledPercent({
      value: item.market_percentage,
      options: {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    }),
  }));

  return (
    <CardWithHeader
      className={getClasses()}
      icon={<ChartPieIcon />}
      title="Stacking Plan"
      isLoading={isLoading}
      isRefetching={isRefetching}
      padding={false}
      hasDataToShow={!!data?.length}
      loaderKind="chart"
    >
      <StackingPlanChart id="StackingPlan" data={transformedData} />
    </CardWithHeader>
  );
};
