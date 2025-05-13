import { GenericLabelValueObject } from "@/commons/typings";
import { Size } from "in-ui-react";

export type GenericTwoColumnsTableData = GenericLabelValueObject & {
  fullWidth?: boolean;
};
export interface GenericTwoColumnsTableProps {
  data: GenericTwoColumnsTableData[];
  className?: string;
  forceOneColumn?: boolean;
  boldKeys?: boolean;
  size?: Size;
}
