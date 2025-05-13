import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { ScreeningDealInformation } from "@/acquisitions/typings/deals";
import { Table } from "in-ui-react";
import { FC } from "react";

export interface DealBackOfTheNapkinTable {
  deal: ScreeningDealInformation;
}

export const DealBackOfTheNapkinTable: FC<DealBackOfTheNapkinTable> = ({
  deal,
}) => {
  return (
    <div className="acq-deal-back-of-the-napkin-table-wrapper">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header>Percentage</Table.Header>
            <Table.Header>Amount</Table.Header>
            <Table.Header>PSF</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Data>Purchase price</Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.purchase_price })}
            </Table.Data>
            <Table.Data>{numberToDollar({ value: deal.psf })}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Transaction costs</Table.Data>
            <Table.Data>
              {numberToPercent(deal.transaction_costs_percentage)}
            </Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.transaction_costs })}
            </Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.transaction_costs_psf })}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Tenant Improvements</Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.tenant_improvements })}
            </Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.tenant_improvements_psf })}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Leasing Commissions</Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.leasing_commissions })}
            </Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.leasing_commissions_psf })}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Capital Expenditures</Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.capital_expenditures })}
            </Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.capital_expenditures_psf })}
            </Table.Data>
          </Table.Row>
          <Table.Row className="bg-ghost-2">
            <Table.Data>Total uses</Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.total_uses })}
            </Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.total_uses_psf })}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Debt</Table.Data>
            <Table.Data>{numberToPercent(deal.debt_percentage)}</Table.Data>
            <Table.Data>{numberToDollar({ value: deal.debt })}</Table.Data>
            <Table.Data>{numberToDollar({ value: deal.debt_psf })}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Equity</Table.Data>
            <Table.Data>{numberToPercent(deal.equity_percentage)}</Table.Data>
            <Table.Data>{numberToDollar({ value: deal.equity })}</Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.equity_psf })}
            </Table.Data>
          </Table.Row>
          <Table.Row className="bg-ghost-2">
            <Table.Data>Total Sources</Table.Data>
            <Table.Data>-</Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.total_sources })}
            </Table.Data>
            <Table.Data>
              {numberToDollar({ value: deal.total_sources_psf })}
            </Table.Data>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
