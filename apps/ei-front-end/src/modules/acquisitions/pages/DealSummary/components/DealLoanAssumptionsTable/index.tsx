import { TableCard } from "@/commons/components/general/TableCard";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
  numberToPercentX,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { Deal } from "@/acquisitions/typings/deals";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { Table } from "in-ui-react";
import { FC } from "react";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
interface DealLoanAssumptionsTableProps {
  deal: Deal;
  className?: string;
}

export const DealLoanAssumptionsTable: FC<DealLoanAssumptionsTableProps> = ({
  deal,
  className,
  ...props
}) => {
  const prefix = "acq-deal-assumptions-table-wrapper";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader
      title=" Loan Assumptions"
      icon={<ClipboardDocumentIcon />}
      className={getClasses()}
      bodyPadding={false}
      {...props}
    >
      <TableCard.Body>
        <Table>
          <Table.Row>
            <Table.Header>Initial Funding</Table.Header>
            <Table.Data>{numberToDollar({ value: deal?.debt })}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Future Funding</Table.Header>
            <Table.Data>
              {numberToDollar({ value: deal?.future_funding })}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Total Debt Issued</Table.Header>
            <Table.Data>
              {numberToDollar({ value: deal?.total_debt })}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Initial LTV</Table.Header>
            <Table.Data>{numberToPercent(deal?.ltv)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Total LTC</Table.Header>
            <Table.Data>{numberToPercent(deal?.ltc)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Going-In Debt Yield</Table.Header>
            <Table.Data>
              {numberToPercent(deal?.going_in_debt_yield)}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Going-In DSCR</Table.Header>
            <Table.Data>
              {numberToPercentX({ value: deal?.going_in_dscr })}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Amort (mo.)</Table.Header>
            <Table.Data>{genericGetValue(deal?.amortization)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Type</Table.Header>
            <Table.Data>{genericGetValue(deal?.loan_type)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Spread</Table.Header>
            <Table.Data>{genericGetValue(deal?.spread)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Benchmark</Table.Header>
            <Table.Data>{genericGetValue(deal?.benchmark)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Term (mo.)</Table.Header>
            <Table.Data>{genericGetValue(deal?.debt_term)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Stabilized Debt Yield</Table.Header>
            <Table.Data>
              {numberToPercent(deal?.stabilized_debt_yield)}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Stabilized DSCR</Table.Header>
            <Table.Data>
              {numberToPercentX({ value: deal?.stabilized_dscr })}
            </Table.Data>
          </Table.Row>
        </Table>
      </TableCard.Body>
    </CardWithHeader>
  );
};
