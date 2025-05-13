import { GenericSortableContext } from "@/commons/components/contexts/GenericSortableContext";
import { SortableContext } from "@dnd-kit/sortable";
import { ComponentProps, FC } from "react";

export const LoansSortableTableDndSortableContext: FC<
  ComponentProps<typeof SortableContext>
> = ({ children, ...props }) => {
  return <GenericSortableContext {...props}>{children}</GenericSortableContext>;
};
