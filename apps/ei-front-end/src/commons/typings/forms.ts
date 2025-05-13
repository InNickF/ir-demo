import { HTMLAttributes, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

export type GenericObject = Record<string | number | symbol, unknown>;

export type GenericFormRenderFunctionProps<T extends GenericObject> = {
  state: UseFormReturn<T>;
  HTMLAttributes?: Omit<HTMLAttributes<HTMLElement>, "color">;
  isFullForm?: boolean;
};

export type GenericFormFieldRenderer<T extends GenericObject> = {
  key: keyof T;
  render: (props: GenericFormRenderFunctionProps<T>) => ReactNode;
};
