import { CardWithHeaderProps } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { UseQueryResult } from "@tanstack/react-query";

export interface CommonInvestingPerformanceCardProps<
  TEntity,
  TFilters extends GenericFilterPayload
> extends Omit<CardWithHeaderProps, "children" | "title" | "icon"> {
  useQuery: (filters: TFilters) => UseQueryResult<TEntity, unknown>;
  title?: string;
  icon?: JSX.Element;
  filters?: TFilters;
}
