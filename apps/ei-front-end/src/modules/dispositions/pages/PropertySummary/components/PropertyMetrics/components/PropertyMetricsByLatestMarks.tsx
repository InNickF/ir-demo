import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { numberToPercent } from "@/commons/model-in/formatters/utils/amount-conversions";
import { Property } from "@/modules/assets/typings/properties";
import { Empty, Table } from "in-ui-react";
import { FC, useMemo } from "react";
import { generatePriceWithPSFString } from "../../../utils";

export const PropertyMetricsByLatestMarks: FC<{
  property: Property;
}> = ({ property }) => {
  const kpis = useMemo(
    () => [
      {
        title: "NOI T12",
        value: generatePriceWithPSFString({
          amount: property?.noi_over_last_12_months_noidm,
          sf: property?.rentable_building_area,
        }),
      },
      {
        title: "Occupancy",
        value: numberToPercent(property?.occupancy_rate, true),
      },
      {
        title: "WALT",
        value: property?.current_walt.toFixed(2) + " years",
      },
      {
        title: "Gross IRR",
        value: numberToPercent(property?.current_gross_irr, true),
      },
      {
        title: "Gross MoC",
        value: `${Number(property?.current_gross_moc).toFixed(2)}x`,
      },
      {
        title: "Profit",
        value: generatePriceWithPSFString({
          amount: property?.current_profit,
          sf: property?.rentable_building_area,
        }),
      },
      {
        title: "Invested Capital",
        value: generatePriceWithPSFString({
          amount: property?.capital_invested,
          sf: property?.rentable_building_area,
        }),
      },
      {
        title: "NAV",
        value: generatePriceWithPSFString({
          amount: property?.current_nav,
          sf: property?.rentable_building_area,
        }),
      },
      {
        title: "Total Basis",
        value: generatePriceWithPSFString({
          amount: property?.current_total_basis,
          sf: property?.rentable_building_area,
        }),
      },
      {
        title: "GAV",
        value: generatePriceWithPSFString({
          amount: property?.current_gav,
          sf: property?.rentable_building_area,
        }),
      },
      {
        title: "Cash on Cash T12",
        value: numberToPercent(
          property?.current_cash_on_cash_over_last_12_months,
          true
        ),
      },
      {
        title: "Yield on Cost T12",
        value: numberToPercent(
          property?.yield_on_cost_over_last_12_months_noidm
        ),
      },
      {
        title: "Debt Yield T12",
        value: numberToPercent(property?.debt_yield_over_last_12_months_noidm),
      },
    ],
    [property]
  );

  return (
    <>
      {property ? (
        <Table>
          <Table.Body>
            {kpis?.map((kpi) => (
              <Table.Row key={kpi.title}>
                <Table.Data>
                  <p className="font-bold">{kpi.title}</p>
                </Table.Data>
                <Table.Data>
                  <p>{kpi.value || genericNoDataText}</p>
                </Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Empty className="mx-auto" />
      )}
    </>
  );
};
