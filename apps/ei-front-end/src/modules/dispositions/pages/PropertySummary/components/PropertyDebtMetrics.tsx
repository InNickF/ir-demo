import { GenericTwoColumnsTable } from "@/commons/components/data-display/GenericTwoColumnsTable";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { useProperty } from "@/modules/assets/services/queries/properties";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface PropertyInformationProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  propertyId: string | string[];
}

export const PropertyDebtMetrics: FC<PropertyInformationProps> = ({
  propertyId,
  ...props
}) => {
  const {
    data,
    isLoading: isLoadingDebtMetrics,
    isRefetching: isRefetchingDebtMetrics,
  } = useProperty({ propertyId: propertyId as string });

  const columns = [
    {
      label: "LTV on Current Balance",
      value: numberToPercent(data?.current_ltv, true),
    },
    {
      label: "Current Interest Rate",
      value: numberToPercent(data?.interest_rate),
    },
    {
      label: "Debt Yield T12",
      value: numberToPercent(data?.debt_yield_over_last_12_months_noidm),
    },
    {
      label: "DSCR T12",
      value: genericGetValue(data?.dscr_over_last_12_months_noidm) as string,
    },
    {
      label: "Total Loan Commitment Amount",
      value: numberToDollar({
        value: data?.loan_amount_max_commitment,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
    },
    {
      label: "Loan Balance",
      value: numberToDollar({
        value: data?.current_outstanding_loan_balance,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
    },
  ];

  return (
    <CardWithHeader
      title="Property Debt Metrics"
      icon={<BuildingOfficeIcon />}
      skeletonHeight={230}
      isLoading={isLoadingDebtMetrics}
      isRefetching={isRefetchingDebtMetrics}
      loaderKind="chart"
      hasDataToShow={!!data}
      {...props}
    >
      <GenericTwoColumnsTable data={columns} />
    </CardWithHeader>
  );
};
