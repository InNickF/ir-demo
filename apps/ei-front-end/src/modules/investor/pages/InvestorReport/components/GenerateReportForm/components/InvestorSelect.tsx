import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useGetAllInvestors } from "@/modules/investor/services/queries/investor";

export const InvestorSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  const { data, isLoading } = useGetAllInvestors();
  return (
    <GenericControlledSelect
      isMulti
      options={data?.map((investor) => ({
        label: `${investor.investor}-${investor.investor_code}`,
        value: investor.investor_code.trim(),
      })) as Options[]}
      isLoading={isLoading}
      {...props}
    />
  );
};
