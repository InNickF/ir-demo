import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { DebtLoanCovenantTestingDetail } from "@/modules/debt/typings/loans";
import { Empty, Table, Tooltip } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

export interface LoanCovenantTestingTableProps {
  metrics: DebtLoanCovenantTestingDetail;
  className?: string;
  definition?: string;
}

export const LoanCovenantTestingTable: FC<LoanCovenantTestingTableProps> = ({
  metrics,
  className,
  definition,
}) => {
  const prefix = "debt-loan-covenant-testing-table";

  const contentWithoutDefinition = metrics?.content?.filter(
    ({ key }) => !key?.toLowerCase().includes("definition")
  );

  const columnsWithoutDefinition = metrics?.columns?.filter(
    ({ label }) => label?.toLowerCase() !== "definition"
  );

  const getClasses = () => {
    const classes = [`${prefix}`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const tableHasValues = metrics?.content?.some((metric) => {
    if (metric.value !== null && metric.value !== "") return metric.value;

    return false;
  });

  return (
    <div className="overflow-auto">
      {definition ? (
        <p className="p-3 mb-1 text-sm">
          <span className="mr-1 font-bold">Definition:</span>
          {definition}
        </p>
      ) : null}

      <Table className={getClasses()}>
        <Table.Row>
          {columnsWithoutDefinition.map(({ label }, key) => {
            return <Table.Header key={key}>{label}</Table.Header>;
          })}
        </Table.Row>

        <Table.Body>
          <Table.Row>
            {tableHasValues ? (
              contentWithoutDefinition?.map(({ value }, key) => {
                const isLongText = value?.toString().length > 50;
                const slicedText = (text: string): string => {
                  return text.slice(0, 50)?.concat("...");
                };
                return (
                  <Table.Data key={key} wrapText={false}>
                    <Tooltip content={value?.toString()} hidden={!isLongText}>
                      <p>
                        {isLongText
                          ? slicedText(value?.toString())
                          : value || genericNoDataText}
                      </p>
                    </Tooltip>
                  </Table.Data>
                );
              })
            ) : (
              <Table.Data colSpan={8}>
                <Empty className="mx-auto" />
              </Table.Data>
            )}
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
