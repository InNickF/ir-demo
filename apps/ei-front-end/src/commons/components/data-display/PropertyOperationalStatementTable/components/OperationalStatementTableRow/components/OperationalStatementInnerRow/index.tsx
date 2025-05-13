import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { OperationalStatementTableMetricsType } from "@/modules/assets/typings/property";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Modal, Table } from "in-ui-react";
import { FC } from "react";
import { operationalStatementTableColumns } from "../../../../utils";
import "./styles.css";
import { getTextColorForOFPMetricComparison } from "@/modules/assets/utils/operational-financial-performance";
import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";

interface CommentsComponentProps {
  columnMetrics: OperationalStatementTableMetricsType;
}

export const CommentsComponent: FC<CommentsComponentProps> = ({
  columnMetrics,
}) => {
  return (
    <>
      {columnMetrics?.account_comments?.length > 0 ? (
        <Modal
          size="normal"
          disclosure={
            <p className="underline cursor-pointer">
              {slicedTextWithEllipsis({
                text: columnMetrics?.account_comments[0],
                maxLength: 30,
              })}
            </p>
          }
          // workaround to prevent focus trap
          options={{ modal: false, animated: true }}
        >
          {(dialog) => (
            <>
              <Modal.Header
                onClose={() => {
                  dialog.hide();
                }}
              >
                {columnMetrics.metric} Comments
              </Modal.Header>
              <Modal.Body>
                {columnMetrics.account_comments.map((comment, index) => {
                  return (
                    <p className="mb-4" key={index}>
                      {comment}
                    </p>
                  );
                })}
              </Modal.Body>
            </>
          )}
        </Modal>
      ) : null}
    </>
  );
};
interface DrillDownIconProps {
  isOpen: boolean;
  hasToRender: boolean;
}
const DrillDownIcon: FC<DrillDownIconProps> = ({ isOpen, hasToRender }) => {
  return hasToRender ? (
    <div className="w-6 h-6 pr-1 pt-0.5">
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </div>
  ) : null;
};

interface IndentationElementProps {
  indentation: number;
  className?: string;
}
const IndentationElement: FC<IndentationElementProps> = ({
  indentation,
  className,
}) => {
  const getClasses = () => {
    const classes = ["operational-statement-indentation"];
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <div className={getClasses()}>
      {Array.from({ length: indentation }).map((_, index) => (
        <div
          key={`operational-statement-indentation__element-${index}`}
          className="operational-statement-indentation__element"
        ></div>
      ))}
    </div>
  );
};
interface OperationalStatementInnerRowProps {
  className?: string;
  metrics: OperationalStatementTableMetricsType;
  drillDownIsOpen: boolean;
  indentation?: number;
  setDrillDownIsOpen: (value: boolean) => void;
}

export const OperationalStatementInnerRow: FC<
  OperationalStatementInnerRowProps
> = ({
  className,
  metrics,
  drillDownIsOpen,
  setDrillDownIsOpen,
  indentation,
}) => {
  const hasDrillDown = metrics.drill_down && metrics.drill_down.length > 0;

  // const metricInSnakeCase = convertToSnakeCase(metrics.metric.toLowerCase());

  return (
    <Table.Row className={className}>
      {operationalStatementTableColumns.map((column, index) => {
        const isFirstColumn = index === 0;

        const isVarianceOrPercentageColumn =
          column === "variance" || column === "variance_percentage";

        const getIndentationElementClasses = () => {
          const classes = [];
          (!isFirstColumn || indentation === 0) &&
            classes.push("operational-statement-indentation--hidden");
          return classes.join(" ");
        };

        const getFirstTDClasses = () => {
          return isFirstColumn && indentation >= 1
            ? "operational-statement-no-td-padding"
            : undefined;
        };

        const colorClasses = getTextColorForOFPMetricComparison({
          variance: metrics?.variance,
          type: metrics?.type,
        });

        const columnColorClasses = () => {
          const classes = ["flex", "items-center"];
          column !== "metric" && classes.push("justify-end");
          isVarianceOrPercentageColumn && classes.push(colorClasses);
          return classes.join(" ");
        };

        const columnDataFormatter = () => {
          if (column === "metric") {
            return convertToTitleCase(metrics[column]);
          }

          if (
            column === "actual" ||
            column === "reference" ||
            column === "variance"
          ) {
            return numberToDollar({
              value: metrics[column],
              options: {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              },
            });
          }

          if (column === "variance_percentage") {
            return numberToPercent(metrics[column]);
          }

          if (column === "account_comments") {
            <CommentsComponent columnMetrics={metrics} />;
          }
        };

        return (
          <Table.Data
            key={column}
            onClick={() => setDrillDownIsOpen(!drillDownIsOpen)}
            className={getFirstTDClasses()}
            monospaceFont={!isFirstColumn}
            textAlignment={!isFirstColumn ? "right" : "left"}
          >
            <div className={columnColorClasses()}>
              <IndentationElement
                className={getIndentationElementClasses()}
                indentation={indentation}
              />
              <DrillDownIcon
                isOpen={drillDownIsOpen}
                hasToRender={isFirstColumn && hasDrillDown}
              />
              {columnDataFormatter()}
            </div>
          </Table.Data>
        );
      })}
    </Table.Row>
  );
};
