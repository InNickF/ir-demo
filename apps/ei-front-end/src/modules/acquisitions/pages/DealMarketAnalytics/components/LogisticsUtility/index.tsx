import { MarketAnalyticsSectionContainer } from "@/commons/components/data-display/MarketAnalyticSections";
import { Deal } from "@/acquisitions/typings/deals";
import { IsLoadingProp } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { useDealCustomerAccess } from "@/modules/acquisitions/services/queries/market-analytics";
import { dealCustomerAccessFormatter } from "@/modules/acquisitions/utils/formatters/deal-customer-access-formatters";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC, useMemo } from "react";
import { GenericMetric, MetricsTable } from "./components/MetricsTable";
import { UtilityScore } from "./components/UtilityScore";

interface LogisticsUtilitySectionProps extends IsLoadingProp {
  deal: Deal;
}
export const LogisticsUtilitySection: FC<LogisticsUtilitySectionProps> = ({
  deal,
  isLoading,
}) => {
  const { data: customerAccessData, isLoading: isCustomerAccessLoading } =
    useDealCustomerAccess({
      dealId: deal?.id,
    });

  const customerAccessMetrics: GenericMetric[] = useMemo(() => {
    const customerAccessMetric = customerAccessData?.results?.[0];
    if (!customerAccessMetric) return [];

    return Object.keys(customerAccessMetric).map((key) => {
      return {
        name: convertToTitleCase(humanizeSnakeCase(key)),
        value:
          dealCustomerAccessFormatter?.[key]({
            value: customerAccessMetric?.[key],
          })?.value || genericGetValue(customerAccessMetric?.[key]),
      };
    });
  }, [customerAccessData]);

  const propertyUtilityMetrics: GenericMetric[] = [
    {
      name: "Truck Court Depth",
      value: genericGetValue(deal?.truck_court_depth),
    },
    {
      name: "Parking Spaces",
      value: readableNumber(deal?.parking_spaces),
    },
    {
      name: "Parking Ratio",
      value: readableNumber(deal?.parking_ratio),
    },
    {
      name: "Office SF",
      value: readableNumber(deal?.office_sf),
    },
    {
      name: "Office Finish (%)",
      value: numberToPercent(deal?.office_finish),
    },
  ];
  return (
    <MarketAnalyticsSectionContainer title="Logistics Utility">
      <div className="commons-grid">
        <UtilityScore className="commons-grid-span-8" />
        <MetricsTable
          metrics={customerAccessMetrics}
          title="Customer Access"
          icon={<TableCellsIcon />}
          className="commons-grid-span-4"
          isLoading={isCustomerAccessLoading}
        />
        <MetricsTable
          metrics={propertyUtilityMetrics}
          title="Property Utility Specs"
          icon={<TableCellsIcon />}
          className="commons-grid-span-6"
          isLoading={isLoading}
        />
      </div>
    </MarketAnalyticsSectionContainer>
  );
};
