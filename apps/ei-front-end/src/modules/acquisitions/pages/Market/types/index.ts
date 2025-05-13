import { Comp } from "@/acquisitions/typings/market-analytics";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericCompUseMutation = <T extends Comp>() => UseMutationResult<
  T,
  unknown,
  T,
  unknown
>;
export interface CompFormProps {
  comp?: Comp;
  onCancel?: () => void;
  onAction?: () => void;
  cancelText?: string;
  actionText?: string;
  useMutation: GenericCompUseMutation;
}

export interface CompModalState extends CompFormProps {
  Form: ComponentType<CompFormProps>;
  header?: string;
}

export interface CompModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    CompModalState {}
