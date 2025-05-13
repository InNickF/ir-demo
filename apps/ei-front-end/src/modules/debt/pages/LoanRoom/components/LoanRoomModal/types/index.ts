import {
  DebtLoanRoomItem,
  DebtLoanRoomItemPayload,
  DebtLocalLoanRoomItem,
} from "@/modules/debt/typings/loans";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericLoanRoomUseMutation = <
  T extends DebtLoanRoomItem | DebtLoanRoomItemPayload
>() => UseMutationResult<T, unknown, T, unknown>;

export interface LoanRoomFormProps {
  item?: DebtLoanRoomItem;
  onCancel?: () => void;
  onAction?: (file: DebtLoanRoomItem | DebtLocalLoanRoomItem) => void;
  cancelText?: string;
  actionText?: string;
  useMutation?: GenericLoanRoomUseMutation;
}

export interface LoanRoomModalState extends LoanRoomFormProps {
  Form: ComponentType<LoanRoomFormProps>;
  type?: string;
  header?: string;
}

export interface LoanRoomModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    LoanRoomModalState {}
