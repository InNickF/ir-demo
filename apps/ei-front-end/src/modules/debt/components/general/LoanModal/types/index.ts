import { GenericLabelValueObject } from "@/commons/typings";
import {
  DebtLoanContractPayload,
  LegacyDebtLoanPayload,
} from "@/modules/debt/typings/loans";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericLoanModalUseMutation = <T>() => UseMutationResult<
  T,
  unknown,
  T,
  unknown
>;

export interface LoanModalFormProps {
  item?: {
    property: GenericLabelValueObject;
    is_loan_active?: boolean;
    loan_name?: string;
    loan_abstract_id: string;
  };
  onCancel?: () => void;
  onAction?: (form: LegacyDebtLoanPayload | DebtLoanContractPayload) => void;
  cancelText?: string;
  actionText?: string;
  className?: string;
}

export interface LoanModalState extends LoanModalFormProps {
  Form: ComponentType<LoanModalFormProps>;
  header?: string;
}

export interface LoanModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    LoanModalState {}
