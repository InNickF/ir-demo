import {
  GenericFilterPayload,
  IsLoadingProp,
  IPaginatedResponse,
} from "@/commons/typings";
import { Comp, CompTotals } from "@/acquisitions/typings/market-analytics";
import { UseQueryResult } from "@tanstack/react-query";
import { IconProps } from "in-ui-react";

export type TableActionsType = (comp: Comp) => JSX.Element;
export interface CompProps {
  filters: GenericFilterPayload;
  useQuery: <T extends Comp>(
    filters: GenericFilterPayload & {
      type: T["type"];
    }
  ) => UseQueryResult<IPaginatedResponse<T>, unknown>;
  useQueryTotals: <T extends CompTotals>(
    filters: GenericFilterPayload & {
      type: Comp["type"];
    }
  ) => UseQueryResult<T, unknown>;
  onMainAction?: () => void;
  mainActionText?: string;
  title?: string;
  icon?: IconProps["svg"];
  tableActions: TableActionsType;
  className?: string;
}

export interface CompTableProps<CompType, CompTypeTotals>
  extends IsLoadingProp {
  data: CompType[];
  totals: CompTypeTotals;
  isLoadingTotals?: boolean;
  page: number;
  totalPages: number;
  count: number;
  setPage: (page: number) => void;
  ordering: string;
  setOrdering: (orderingKey: string) => void;
  tableActions: TableActionsType;
}
