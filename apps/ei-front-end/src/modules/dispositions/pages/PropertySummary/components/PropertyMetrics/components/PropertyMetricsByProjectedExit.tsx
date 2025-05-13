import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { PropertyProjectedExitMetrics } from "@/modules/assets/typings/property";
import { Empty, Table } from "in-ui-react";
import { FC } from "react";
import { generatePriceWithPSFString } from "../../../utils";
import { numberToPercent } from "@/commons/model-in/formatters/utils/amount-conversions";

export const PropertyMetricsByProjectedExit: FC<{
  data: PropertyProjectedExitMetrics;
}> = ({ data }) => {
  const kpis = [
    {
      title: "Adjusted NOI at Exit*",
      value: generatePriceWithPSFString({
        amount: data?.adjusted_noi_at_exit,
        sf: data?.sf,
      }),
    },
    {
      title: "Exit Occupancy",
      value: data?.occupancy_at_exit,
    },
    {
      title: "WALT at Exit",
      value: data?.walt_at_exit,
    },
    {
      title: "Gross IRR",
      value: numberToPercent(Number(data?.irr * 100)),
    },
    {
      title: "Gross MoC",
      value: `${Number(data?.moc).toFixed(2)}x`,
    },
    {
      title: "Profit",
      value: generatePriceWithPSFString({
        amount: data?.profit,
        sf: data?.sf,
      }),
    },
    {
      title: "Invested Capital at Exit",
      value: generatePriceWithPSFString({
        amount: data?.invested_equity_at_exit,
        sf: data?.sf,
      }),
    },
    {
      title: "Total Basis at Exit",
      value: generatePriceWithPSFString({
        amount: data?.total_basis_at_exit,
        sf: data?.sf,
      }),
    },
    {
      title: "Sale Price",
      value: generatePriceWithPSFString({
        amount: data?.projected_sale_price,
        sf: data?.sf,
      }),
    },
    {
      title: "Net Proceeds After Sale",
      value: generatePriceWithPSFString({
        amount: data?.projected_net_proceeds,
        sf: data?.sf,
      }),
    },
    {
      title: "Exit Cap Rate",
      value: data?.exit_cap_rate,
    },
    {
      title: "Exit Imputed Cap Rate",
      value: data?.imputed_cap_rate,
    },
    {
      title: "Buyer’s Year 3 YOC",
      value: data?.buyers_3rd_year_adj_yoc,
    },
  ];

  return (
    <>
      {data ? (
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

      <p className="pt-2 text-xs text-center text-silver">
        *NOI gross of vacancy and free rent. This would be the NOI typically
        underwritten by buyers to apply a cap rate
      </p>
    </>
  );
};
