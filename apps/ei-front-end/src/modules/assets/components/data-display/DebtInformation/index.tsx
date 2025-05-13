import { GenericTwoColumnsTable } from "@/commons/components/data-display/GenericTwoColumnsTable";
import { GenericTwoColumnsTableData } from "@/commons/components/data-display/GenericTwoColumnsTable/typings";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { useOverviewDebtInformation } from "@/modules/debt/services/queries/overview";
import { OverviewDebtInformation } from "@/modules/debt/typings/overview";
import {
  debtInformationFormatter,
  debtInformationHeaderFormatter,
} from "@/modules/debt/utils/formatters/overview-formatters";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Empty } from "in-ui-react";
import { FC } from "react";

interface DebtInformationProps {
  className?: string;
  filteredOptions: GenericFilterPayload;
}

export const DebtInformation: FC<DebtInformationProps> = ({
  className,
  filteredOptions,
  ...props
}) => {
  const getClasses = () => {
    const prefix = [""];
    className && prefix.push(className);
    return prefix.join(" ");
  };

  const { data, isLoading, isRefetching } =
    useOverviewDebtInformation(filteredOptions);

  const formattedData: GenericTwoColumnsTableData[] = Object.entries(
    data || {}
  ).map(([key, value]) => {
    return {
      key: debtInformationHeaderFormatter({
        key: key as keyof OverviewDebtInformation,
      }),
      value: debtInformationFormatter.format({
        key: key as keyof typeof debtInformationFormatter.map,
        value: value,
      }).value,
      fullWidth: false,
    };
  });

  return (
    <CardWithHeader
      className={getClasses()}
      title="Debt Information"
      icon={<CreditCardIcon />}
      skeletonHeight={230}
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
      {...props}
    >
      {formattedData.length > 0 ? (
        <GenericTwoColumnsTable data={formattedData} />
      ) : (
        <Empty />
      )}
    </CardWithHeader>
  );
};
