import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { DealSummary } from "@/modules/acquisitions/typings/deals";
import { FC } from "react";
import "./styles.css";

interface DealMetricsTableProps {
  metrics: DealSummary["deal_metrics"];
  showNoData?: boolean;
}
export const DealMetricsTable: FC<DealMetricsTableProps> = ({
  metrics,
  showNoData = false,
}) => {
  const prefix = "acq-deal-metrics-table";

  const colsByLine = metrics
    .map((section) => section.map((line) => line.length))
    .flat();
  const maxCols = Math.max(...colsByLine);

  return (
    <>
      <table className={prefix}>
        {metrics.map((section, i) => {
          return (
            <tbody key={`${i}-section`} className={`${prefix}__section`}>
              {section.map((metricsLine, j) => {
                if (!metricsLine.length) return null;

                const labels = metricsLine
                  .map((metric) => {
                    if (showNoData) {
                      return metric?.label || null;
                    }

                    const hasLabelAndValue = metric?.label && metric?.value;
                    return hasLabelAndValue ? metric?.label : null;
                  })
                  .filter((label) => label !== null);

                const renderLabel = labels.length ? labels.join(" | ") : null;

                const MetricLabel = () => {
                  return renderLabel ? (
                    <td className={`${prefix}__section__metric-label`}>
                      {renderLabel}
                    </td>
                  ) : null;
                };

                const needEmptyCol = maxCols - metricsLine.length;

                const EmptyColumn = () => {
                  return needEmptyCol ? (
                    <>
                      {Array.from({ length: needEmptyCol }, (_, k) => (
                        <td key={`empty-col-${i}-${j}-${k}`}></td>
                      ))}
                    </>
                  ) : null;
                };

                const MetricValues = () => {
                  return (
                    <>
                      {metricsLine.map((metric) => {
                        const hasValue = metric && metric?.value;

                        return hasValue || showNoData ? (
                          <td
                            key={`${i}-${j}-${metric?.label}`}
                            className={`${prefix}__section__metric-value`}
                          >
                            {metric?.value || genericNoDataText}
                          </td>
                        ) : null;
                      })}
                    </>
                  );
                };

                return (
                  <>
                    {renderLabel ? (
                      <>
                        <tr key={`${i}-${j}-row`}>
                          <MetricLabel />
                          <EmptyColumn />
                          <MetricValues />
                        </tr>
                      </>
                    ) : null}
                  </>
                );
              })}
            </tbody>
          );
        })}
      </table>
    </>
  );
};
