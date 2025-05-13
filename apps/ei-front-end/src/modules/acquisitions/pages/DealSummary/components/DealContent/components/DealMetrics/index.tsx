import { DealSummary } from "@/acquisitions/typings/deals";
import { CardWithHeaderProps } from "@/commons/components/general/CardWithHeader";
import { TableCard } from "@/commons/components/general/TableCard";
import { DealMetricsTable } from "@/modules/acquisitions/components/data-display/DealMetricsTable";
import { Empty } from "in-ui-react";
import { FC } from "react";
import { DealMetricsCard } from "../../../DealMetricsCard";

interface MetricProps extends Omit<CardWithHeaderProps, "title" | "icon"> {
  metrics: DealSummary["deal_metrics"];
  showNoData?: boolean;
}
export const DealMetrics: FC<MetricProps> = ({
  metrics = [],
  showNoData,
  ...props
}) => {
  return (
    <DealMetricsCard {...props} bodyPadding={true}>
      <TableCard.Body>
        {metrics.length ? (
          <DealMetricsTable metrics={metrics} showNoData={showNoData} />
        ) : (
          <Empty className="mx-auto" />
        )}
      </TableCard.Body>
    </DealMetricsCard>
  );
};
