import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { TwoColumnsTable } from "@/modules/assets/components/data-display/TwoColumnsTable";
import { useGetKpiPortfolio } from "@/modules/assets/services/queries/portfolio";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { ButtonGroup } from "in-ui-react";
import { FC } from "react";
import { usePortfolioMetricsFilter } from "./hooks/usePortfolioMetricsFilter";
import "./styles.css";

interface PortfolioMetricsProps {
  filters: GenericFilterPayload;
  className?: string;
  twoColumns?: boolean;
}

export const PortfolioMetrics: FC<PortfolioMetricsProps> = ({
  filters,
  className,
  twoColumns = false,
}) => {
  const prefix = "asset-portfolio-page__kpi";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };
  const { PortfolioMetricsFilter, PortfolioMetricsItems } =
    usePortfolioMetricsFilter();

  const { data, isLoading, isRefetching } = useGetKpiPortfolio(
    filters,
    String(PortfolioMetricsFilter)
  );

  const leftColumnRows = [
    {
      label: "NOI",
      value: numberToDollar({
        value: data?.noi,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
    },
    { label: "WALT", value: data?.walt?.toFixed(2) + " Years" },
    { label: "Gross MoC", value: `${data?.moc}x` },
    {
      label: "Invested Capital",
      value: numberToDollar({
        value: data?.capitalInvested,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
    },
    {
      label: "GAV",
      value: numberToDollar({
        value: data?.gmv,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
    },
    { label: "Debt Yield", value: numberToPercent(data?.debtYield) },

    /* { label: "Yield on Cost", value: numberToPercent(data?.yieldCost) }, */
  ];

  const rightColumnRows = [
    { label: "Occupancy", value: numberToPercent(data?.occupancy) },
    { label: "Gross IRR", value: numberToPercent(data?.irr * 100) },
    {
      label: "Profit",
      value: numberToDollar({
        value: data?.profit,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
    },
    {
      label: "NAV",
      value: numberToDollar({
        value: data?.fmv,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
    },
    { label: "Cash on Cash", value: numberToPercent(data?.cashOnCash) },
    // { label: "Debt Yield", value: numberToPercent(data?.debtYield) },
  ];

  const cardTitle =
    data?.quarter && data?.year
      ? `Portfolio Metrics as of: ${data?.quarter} ${data?.year}`
      : "Portfolio Metrics";

  return (
    <article className={getClasses()}>
      <CardWithHeader
        icon={<ChartPieIcon />}
        skeletonHeight={250}
        title={cardTitle}
        headerActions={
          <ButtonGroup
            active={PortfolioMetricsFilter}
            items={PortfolioMetricsItems}
          />
        }
        isLoading={isLoading}
        isRefetching={isRefetching}
      >
        <TwoColumnsTable
          leftColumnRows={leftColumnRows}
          rightColumnRows={rightColumnRows}
          forceOneColumn={twoColumns}
        />
      </CardWithHeader>
    </article>
  );
};
