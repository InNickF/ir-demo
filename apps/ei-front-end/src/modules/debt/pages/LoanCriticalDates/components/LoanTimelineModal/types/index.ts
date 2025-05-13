import { DebtLoanTimeline } from "@/modules/debt/typings/loans";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericLoanTimelineUseMutation = <
  T extends DebtLoanTimeline
>() => UseMutationResult<T, unknown, T, unknown>;

export interface LoanTimelineFormProps {
  item?: DebtLoanTimeline;
  onCancel?: () => void;
  onAction?: (timeline: DebtLoanTimeline) => void;
  cancelText?: string;
  actionText?: string;
  useMutation?: GenericLoanTimelineUseMutation;
}

export interface LoanTimelineModalState extends LoanTimelineFormProps {
  Form: ComponentType<LoanTimelineFormProps>;
  header?: string;
}

export interface LoanTimelineModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    LoanTimelineModalState {}
