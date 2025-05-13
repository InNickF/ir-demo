import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import {
  useGetFund,
  useGetFundExitIRR,
  useGetFundIRR,
} from "@/modules/assets/services/queries/funds";
import { Fund } from "@/modules/assets/typings/funds";
import { fundFormatter } from "@/modules/assets/entities/fund/formatters";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { useFundPortfolioMetricsFilter } from "./hooks/useFundPortfolioMetricsFilter";
import { filteredFundPortfolioMetrics } from "./utils";
import { ButtonGroup } from "in-ui-react";

interface FundPortfolioMetricsProps {
  filters: GenericFilterPayload;
  className?: string;
}

export const FundPortfolioMetrics: FC<FundPortfolioMetricsProps> = ({
  filters,
  className,
}) => {
  const prefix = "asset-fund-properties-metrics";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };
  const { FundPortfolioMetricsFilter, FundPortfolioMetricsItems } =
    useFundPortfolioMetricsFilter();

  const { data, isLoading, isRefetching } = useGetFund({
    filters: {
      ...filters,
    },
  });

  const { data: fundIRR, isLoading: isIRRLoading } = useGetFundIRR({
    filters: {
      fund_name: filters?.fund,
      status: filters?.status,
    },
  });

  const { data: fundExitIRR, isLoading: isExitIRRLoading } = useGetFundExitIRR({
    filters: {
      fund_name: filters?.fund,
      status: filters?.status,
    },
  });

  const cardTitle =
    data?.quarter && data?.year
      ? `Portfolio Metrics as of: ${data?.quarter} ${data?.year}`
      : "Portfolio Metrics";

  const filteredData = filteredFundPortfolioMetrics({
    metrics: {
      ...data,
      current_irr: fundIRR?.irr,
      projected_exit_irr: fundExitIRR?.irr,
    },
    filter: FundPortfolioMetricsFilter,
  });

  const wordsToExclude = ["current", "projected", "exit", "liquidation"];
  const formattedGridItems = filteredData
    ?.map(([key, value]) => ({
      label: convertToTitleCase(
        humanizeSnakeCase(key)
          .split(" ")
          .filter((word) => !wordsToExclude.includes(word.toLowerCase()))
          .join(" ")
      ).replace(/Capital Invested/g, "Invested Capital"),
      value: fundFormatter.value.format({
        key: key as keyof Fund,
        value,
      }).value,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <article className={getClasses()}>
      <CardWithHeader
        icon={<ChartPieIcon />}
        skeletonHeight={250}
        title={cardTitle}
        headerActions={
          <ButtonGroup
            active={FundPortfolioMetricsFilter}
            items={FundPortfolioMetricsItems}
          />
        }
        isLoading={isLoading || isIRRLoading || isExitIRRLoading}
        isRefetching={isRefetching}
        bodyPadding={false}
        loaderKind="chart"
      >
        <SimpleLabelValueGrid items={formattedGridItems || []} noGrow={true} />
      </CardWithHeader>
    </article>
  );
};
