import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { LegacyTenantBreakdown } from "@/modules/assets/typings/asset-growth";
import { Table } from "in-ui-react";
import { FC } from "react";
import { TenancyCalculationType } from "../../..";
import "../styles.css";

interface TenantBreakdownTableProps {
  className?: string;
  data: LegacyTenantBreakdown[];
  calculationType: TenancyCalculationType;
}
export const TenantBreakdownTable: FC<TenantBreakdownTableProps> = ({
  className,
  data,
  calculationType,
}) => {
  const prefix = "assets-tenant-breakdown-table";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <div className={`${prefix}__wrapper`}>
      <Table className={getClasses()}>
        <Table.Head>
          <Table.Row>
            <Table.Header>Category</Table.Header>
            <Table.Header>Value</Table.Header>
            <Table.Header>Percentage</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.category}>
              <Table.Data>{item?.category || genericNoDataText}</Table.Data>
              <Table.Data>
                {calculationType === "rentable_area"
                  ? readableNumber(item?.value)
                  : numberToDollar({
                      value: item?.value,
                      options: {
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0,
                      },
                    }) || genericNoDataText}
              </Table.Data>

              <Table.Data>
                {numberToPercent(item?.percentage * 100) || genericNoDataText}
              </Table.Data>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
