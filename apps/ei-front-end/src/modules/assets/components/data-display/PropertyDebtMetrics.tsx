import { useGetPropertyDebtMetrics } from "@/assets/services/queries/properties";
import { PropertyDebtMetrics as TPropertyDebtMetrics } from "@/assets/typings/properties";
import { assetDebtMetricsFormatter } from "@/assets/utils/formatters/properties";
import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { GenericLabelValueObject } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { Button, Select } from "in-ui-react";
import { FC, useEffect, useState } from "react";
interface PropertyInformationProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  propertyId: string;
  twoColumn?: boolean;
}

export const PropertyDebtMetrics: FC<PropertyInformationProps> = ({
  propertyId,
  ...props
}) => {
  const [selectedLoan, setSelectedLoan] = useState("");

  const { data, isLoading, isRefetching } = useGetPropertyDebtMetrics({
    filters: { yardi_property_code: propertyId },
    onSuccess: (data) => {
      if (data?.results?.[0]?.loan_name) {
        setSelectedLoan(data?.results?.[0]?.loan_name);
      }
    },
  });

  const loansOptions = data?.results?.map((property) => ({
    label: property?.loan_name,
    value: property?.loan_name,
  })) as GenericLabelValueObject[];

  const propertyDebtMetrics = data
    ? Object.entries(data?.results?.[0])
        .filter(
          ([key]) =>
            ![
              "id",
              "loan_name",
              "sorting",
              "contract_file",
              "updated_at",
            ].includes(key)
        )
        .map(([key, value]) => ({
          id:
            data?.results?.find((p) => p.loan_name === selectedLoan)?.[key]
              ?.id || key,
          label: convertToTitleCase(humanizeSnakeCase(key)),
          value: assetDebtMetricsFormatter.format({
            key: key as keyof TPropertyDebtMetrics,
            value,
          }).value,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
    : [];

  const selectedLoanId = data?.results?.find(
    (property) => property?.loan_name === selectedLoan
  )?.id;

  return (
    <CardWithHeader
      title="Property Debt Metrics"
      icon={<BuildingOfficeIcon />}
      skeletonHeight={230}
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
      loaderKind="chart"
      headerActions={
        <>
          {loansOptions?.length !== 0 ? (
            <>
              <Select
                className={loansOptions?.length < 2 ? "hidden" : ""}
                options={loansOptions}
                placeholder="Select a property"
                defaultValue={loansOptions?.[0]}
                value={loansOptions?.find(
                  (property) => property?.value === selectedLoan
                )}
                onChange={(option) => {
                  setSelectedLoan(option?.value);
                }}
              />

              <Button
                kind="solid"
                as="a"
                target="_blank"
                href={`/debt/loans/loan-summary/?loanId=d2e2bdc9af61adb9a5056f3ddc5ed64c`}
              >
                Go to Loan
              </Button>
            </>
          ) : null}
        </>
      }
      hasDataToShow={
        data?.results.length > 0 && propertyDebtMetrics?.length > 0
      }
      {...props}
    >
      <SimpleLabelValueGrid items={propertyDebtMetrics} />
    </CardWithHeader>
  );
};
