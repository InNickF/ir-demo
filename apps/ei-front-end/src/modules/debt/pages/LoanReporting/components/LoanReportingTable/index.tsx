import { booleanToYesNoString } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { DebtLoanReportingDetail } from "@/modules/debt/typings/loans";
import { Empty, Table } from "in-ui-react";
import { FC } from "react";

export interface LoanReportingTableProps {
  metrics: DebtLoanReportingDetail;
  searchQuery?: string;
  className?: string;
}

export const LoanReportingTable: FC<LoanReportingTableProps> = ({
  searchQuery = null,
  metrics,
  className,
}) => {
  const prefix = "debt-loan-reporting-table";

  const getClasses = () => {
    const classes = [`${prefix}`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const filteredMetrics = metrics?.content?.filter(({ key }) =>
    humanizeSnakeCase(key).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Table className={getClasses()}>
      <Table.Head>
        <Table.Row>
          <Table.Header className="min-w-[400px]"></Table.Header>
          {metrics?.columns?.map(({ label }, key) => (
            <Table.Header key={key}>{label}</Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {filteredMetrics?.length > 0 ? (
          filteredMetrics?.map(({ content, key }) => {
            const dateValues = content.map(({ value }) => value);
            return (
              <>
                {content.length > 0 ? (
                  <Table.Row key={key}>
                    <Table.Data>{humanizeSnakeCase(key)}</Table.Data>
                    {dateValues.map((value, index) => {
                      const convertedValue =
                        typeof value === "boolean"
                          ? booleanToYesNoString({ value })
                          : value;
                      return (
                        <Table.Data key={index}>
                          {convertedValue || genericNoDataText}
                        </Table.Data>
                      );
                    })}
                  </Table.Row>
                ) : null}
              </>
            );
          })
        ) : (
          <Table.Row>
            <Table.Data colSpan={5}>
              <Empty className="mx-auto" />
            </Table.Data>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
