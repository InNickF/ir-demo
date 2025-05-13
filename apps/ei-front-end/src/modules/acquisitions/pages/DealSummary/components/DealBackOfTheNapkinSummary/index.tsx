import { TableCard } from "@/commons/components/general/TableCard";
import { ScreeningDealInformation } from "@/acquisitions/typings/deals";
import { FC } from "react";
import { DealMetricsCard } from "../DealMetricsCard";
import { GenericDealMetricTable } from "../GenericDealMetricTable";
import { DealBackOfTheNapkinTable } from "./components/DealBackOfTheNapkinTable";

interface DealBackOfTheNapkinSummaryProps {
  deal: ScreeningDealInformation;
}

export const DealBackOfTheNapkinSummary: FC<
  DealBackOfTheNapkinSummaryProps
> = ({ deal }) => {
  return (
    <DealMetricsCard>
      <TableCard>
        <TableCard.Body>
          <div className="acq-deal-metrics-tables-wrapper">
            <GenericDealMetricTable
              fields={{
                seller: deal.seller,
                sf: deal.sf,
              }}
              inlineFields={true}
            />
            <DealBackOfTheNapkinTable deal={deal} />
            <GenericDealMetricTable
              fields={{
                current_market_rent_sf: deal.current_market_rent_sf,
                imputed_yield_on_cost_percentage:
                  deal.imputed_yield_on_cost_percentage,
              }}
              inlineFields={true}
            />
          </div>
        </TableCard.Body>
      </TableCard>
    </DealMetricsCard>
  );
};
