import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { GenericLabelValueObject } from "@/commons/typings";
import { useGetAllInvestmentsByInvestors } from "@/modules/investor/services/queries/investor";

export const InvestmentSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues> & {
    investors: GenericLabelValueObject[];
  }
) => {
  const { investors } = props;
  const { data, isLoading } = useGetAllInvestmentsByInvestors(investors || []);
  return (
    <GenericControlledSelect
      options={
        data?.map((investment) => ({
          label: `${investment.investment}-${investment.investment_code}`,
          value: investment.investment_code.trim(),
        })) as Options[]
      }
      isMulti
      isLoading={isLoading}
      {...props}
    />
  );
};
