import { GenericFilterPayload, IsLoadingProp } from "@/commons/typings";
import {
  CompstackComp,
  FiltersBySubMarket,
} from "@/modules/acquisitions/typings/market-analytics";
import { Table } from "@tanstack/react-table";
import { ReactNode } from "react";

export type CompstackCompTableActionsType = (
  comp: CompstackComp
) => JSX.Element;
export interface CompstackCompsTableCardPropsBase {
  title?: string;
  icon?: JSX.Element;
  className?: string;
  tableActions?: CompstackCompTableActionsType;
  extraFilters?: GenericFilterPayload;
}
interface CompstackCompsTableCardPropsByMarket
  extends CompstackCompsTableCardPropsBase {
  market: string;
}
interface CompstackCompsTableCardPropsBySubmarket
  extends CompstackCompsTableCardPropsBase,
    FiltersBySubMarket {}

export type CompstackCompsTableCardProps =
  | CompstackCompsTableCardPropsByMarket
  | CompstackCompsTableCardPropsBySubmarket;

export interface GenericCompstackCompTableProps<Comp extends CompstackComp>
  extends IsLoadingProp {
  table: Table<Comp>;
  page?: number;
  totalPages?: number;
  count?: number;
  setPage?: (page: number) => void;
  ordering?: string;
  setOrdering?: (orderingKey: string) => void;
  totalRows?: ReactNode;
}
export interface CompstackCompTableProps<Comp extends CompstackComp>
  extends Omit<GenericCompstackCompTableProps<Comp>, "table"> {
  data: Comp[];
  tableActions?: CompstackCompTableActionsType;
}

export interface UseCompstackCompsTableKookParams<Comp extends CompstackComp> {
  data: Comp[];
  tableActions?: CompstackCompTableActionsType;
}
