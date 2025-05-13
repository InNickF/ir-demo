import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentProps, FC } from "react";

export const GenericSortableContext: FC<
  ComponentProps<typeof SortableContext>
> = ({ children, strategy = verticalListSortingStrategy, ...props }) => {
  return (
    <SortableContext strategy={strategy} {...props}>
      {children}
    </SortableContext>
  );
};
