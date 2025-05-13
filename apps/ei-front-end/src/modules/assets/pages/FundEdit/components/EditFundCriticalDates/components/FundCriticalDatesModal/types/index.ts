import { FundTimeline } from "@/modules/assets/typings/funds";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericFundCriticalDatesUseMutation = <
  T extends FundTimeline
>() => UseMutationResult<T, unknown, T, unknown>;

export interface FundCriticalDatesFormProps {
  item?: FundTimeline;
  onCancel?: () => void;
  onAction?: (timeline: FundTimeline) => void;
  cancelText?: string;
  actionText?: string;
  useMutation?: GenericFundCriticalDatesUseMutation;
}

export interface FundCriticalDatesModalState
  extends FundCriticalDatesFormProps {
  Form: ComponentType<FundCriticalDatesFormProps>;
  header?: string;
}

export interface FundCriticalDatesModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    FundCriticalDatesModalState {}
