import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { TwoColumnsTable } from "@/modules/assets/components/data-display/TwoColumnsTable";
import { useGetKpiPortfolio } from "@/modules/assets/services/queries/portfolio";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
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
  const prefix = "dispositions-portfolio-page__kpi";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { data, isLoading, isRefetching } = useGetKpiPortfolio(filters, "LIQ");

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
  ];

  const rightColumnRows = [
    { label: "Occupancy", value: numberToPercent(data?.occupancy) },
  ];

  const cardTitle =
    data?.quarter && data?.year
      ? `Portfolio Metrics as of: ${data?.quarter} ${data?.year}`
      : "Portfolio Metrics";

  return (
    <article className={getClasses()}>
      <CardWithHeader
        icon={<ChartPieIcon />}
        skeletonHeight={300}
        title={cardTitle}
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
