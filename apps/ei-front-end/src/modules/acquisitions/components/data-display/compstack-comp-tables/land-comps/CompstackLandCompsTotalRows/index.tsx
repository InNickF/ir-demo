import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { useCompstackLandCompTotals } from "@/modules/acquisitions/services/queries/market-analytics";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { Table } from "in-ui-react";
import { FC } from "react";
import { CompstackCompTotalsTableLoader } from "../../CompstackCompTotalsTableLoader";

interface CompstackLandCompsTotalRowsProps {
  dealId: Deal["id"];
}
export const CompstackLandCompsTotalRows: FC<
  CompstackLandCompsTotalRowsProps
> = ({ dealId }) => {
  const { data, isLoading } = useCompstackLandCompTotals({
    deal: dealId,
  });

  return (
    <>
      <Table.Row>
        <Table.Data colSpan={2}>
          <strong>Total / Average</strong>
        </Table.Data>
        <Table.Data>
          {isLoading ? (
            <CompstackCompTotalsTableLoader />
          ) : (
            numberToDollar({
              value: data?.in_place_cap_rate__avg,
            })
          )}
        </Table.Data>
        <Table.Data>
          {isLoading ? (
            <CompstackCompTotalsTableLoader />
          ) : (
            numberToDollar({
              value: data?.price_per_sf__avg,
            })
          )}
        </Table.Data>
        <Table.Data></Table.Data>
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
