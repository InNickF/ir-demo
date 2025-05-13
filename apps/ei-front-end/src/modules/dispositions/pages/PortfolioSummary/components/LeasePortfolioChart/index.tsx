import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { useLegacyGetLeasePortfolio } from "@/modules/assets/services/queries/portfolio";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import "./styles.css";
import { GenericFilterPayload } from "@/commons/typings";
import { Loader } from "in-ui-react";

interface LeasePortfolioChartProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  filters: GenericFilterPayload;
  fundFilter?: string;
  filter?: string;
}

export const LeasePortfolioChart: FC<LeasePortfolioChartProps> = ({
  filters,
  filter,
  className,
  ...props
}) => {
  const prefix = "asset-portfolio-page__lease-chart";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const StackingLeaseChart = dynamic(
    () => import("./component/LeasePortfolioChart"),
    {
      ssr: false,
      loading: () => (
        <div className="flex w-full justify-center items-center">
          <Loader />
        </div>
      ),
    }
  );
  const [filterBy] = useState<{ by: string }>({ by: "saddr1" });

  const { data, isLoading, isRefetching } = useLegacyGetLeasePortfolio(
    filters,
    filter ? filter : filterBy.by
  );
  return (
    <CardWithHeader
      className={getClasses()}
      icon={<ChartPieIcon />}
      skeletonHeight={500}
      title="Lease Expiration"
      isLoading={isLoading}
      isRefetching={isRefetching}
      {...props}
    >
      <StackingLeaseChart
        id="stacking-lease-chart"
        data={data}
        by={filter ? filter : filterBy.by}
      />
    </CardWithHeader>
  );
};
