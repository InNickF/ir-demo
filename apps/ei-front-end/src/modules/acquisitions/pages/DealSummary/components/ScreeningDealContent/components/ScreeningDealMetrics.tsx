import { FC } from "react";
import { CardProps, List } from "in-ui-react";
import { Deal } from "@/acquisitions/typings/deals";
import { DealMetricsCard } from "../../DealMetricsCard";

export const ScreeningDealMetrics: FC<
  CardProps & {
    purchasePrice: Deal["purchase_price"];
    equity: Deal["equity"];
    sf: Deal["sf"];
  }
> = ({ sf, equity, purchasePrice, ...props }) => {
  return (
    <DealMetricsCard {...props}>
      <List>
        <List.Body>
          <List.Row>
            <List.Data>Purchase price</List.Data>
            <List.Data className="font-bold text-right">
              {purchasePrice}
            </List.Data>
          </List.Row>
          <List.Row>
            <List.Data>Equity</List.Data>
            <List.Data className="font-bold text-right">{equity}</List.Data>
          </List.Row>
          <List.Row>
            <List.Data>SF</List.Data>
            <List.Data className="font-bold text-right">{sf}</List.Data>
          </List.Row>
        </List.Body>
      </List>
    </DealMetricsCard>
  );
};
