import { TableCard } from "@/commons/components/general/TableCard";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { Deal } from "@/acquisitions/typings/deals";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { Table } from "in-ui-react";
import { FC } from "react";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
interface DealUnderwritingAssumptionsTableProps {
  deal: Deal;
  className?: string;
}

export const DealUnderwritingAssumptionsTable: FC<
  DealUnderwritingAssumptionsTableProps
> = ({ deal, className, ...props }) => {
  const prefix = "acq-deal-assumptions-table-wrapper";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const tenantImprovementsNew = numberToDollar({
    value: deal?.tenant_improvements_new,
  });
  const tenantImprovementsRenew = numberToDollar({
    value: deal?.tenant_improvements_renew,
  });

  const currentMarketRent = numberToDollar({
    value: deal?.current_market_rent_sf,
  });

  const currentMarketRentString =
    currentMarketRent !== genericNoDataText
      ? `${currentMarketRent} / ${genericGetValue(
          deal?.current_market_rent_sf_type?.value
        )}`
      : genericNoDataText;

  return (
    <CardWithHeader
      title="Underwriting Assumptions"
      icon={<ClipboardDocumentIcon />}
      bodyPadding={false}
      {...props}
    >
      <TableCard.Body>
        <Table className={getClasses()}>
          <Table.Row>
            <Table.Header>Trending Rents</Table.Header>
            <Table.Data>{numberToPercent(deal?.trending_rents)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Term Length (Years)</Table.Header>
            <Table.Data>{genericGetValue(deal?.term_length)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Renewal Probability</Table.Header>
            <Table.Data>
              {numberToPercent(deal?.renewal_probability)}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Months Vacant</Table.Header>
            <Table.Data>{genericGetValue(deal?.months_vacant)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Market Rent / SF</Table.Header>
            <Table.Data>{currentMarketRentString}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Rent Steps</Table.Header>
            <Table.Data>{numberToPercent(deal?.rent_steps)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>New Free Rent</Table.Header>
            <Table.Data>{readableNumber(deal?.new_free_rent)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Recovery Type</Table.Header>
            <Table.Data>{genericGetValue(deal?.recovery_type)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Tenant Improvements New</Table.Header>
            <Table.Data>
              {tenantImprovementsNew}{" "}
              {tenantImprovementsNew !== genericNoDataText ? "/ SF" : null}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Tenant Improvements Renew</Table.Header>
            <Table.Data>
              {tenantImprovementsRenew}{" "}
              {tenantImprovementsRenew !== genericNoDataText ? "/ SF" : null}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Leasing Commissions New</Table.Header>
            <Table.Data>
              {numberToPercent(deal?.leasing_commissions_new)}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Leasing Commissions Renew</Table.Header>
            <Table.Data>
              {numberToPercent(deal?.leasing_commissions_renew)}
            </Table.Data>
          </Table.Row>
        </Table>
      </TableCard.Body>
    </CardWithHeader>
  );
};
