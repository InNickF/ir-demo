import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { Table } from "in-ui-react";
import { FC } from "react";
import { CompstackCompTotalsTableLoader } from "../../CompstackCompTotalsTableLoader";
import { useCompstackLeaseCompTotals } from "@/modules/acquisitions/services/queries/market-analytics";

interface CompstackLeaseCompsTotalRowsProps {
  dealId: Deal["id"];
}
export const CompstackLeaseCompsTotalRows: FC<
  CompstackLeaseCompsTotalRowsProps
> = ({ dealId }) => {
  const { data, isLoading } = useCompstackLeaseCompTotals({
    deal: dealId,
  });

  return (
    <>
      <Table.Row>
        <Table.Data colSpan={3}>
          <strong>Total / Average</strong>
        </Table.Data>
        <Table.Data></Table.Data>
        <Table.Data>
          {isLoading ? (
            <CompstackCompTotalsTableLoader />
          ) : (
            numberToDollar({
              value: data?.annual_starting_rent__avg,
            })
          )}
        </Table.Data>
        <Table.Data></Table.Data>
        <Table.Data></Table.Data>
        <Table.Data></Table.Data>
        <Table.Data></Table.Data>
        <Table.Data></Table.Data>
        <Table.Data></Table.Data>
      </Table.Row>
    </>
  );
};
