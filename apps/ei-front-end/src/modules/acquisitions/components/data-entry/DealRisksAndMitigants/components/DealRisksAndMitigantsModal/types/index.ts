import {
  DealRisksAndMitigants,
  DealRisksAndMitigantsPayload,
} from "@/acquisitions/typings/deals";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericDealRisksAndMitigantsUseMutation = <
  T extends DealRisksAndMitigants | DealRisksAndMitigantsPayload
>() => UseMutationResult<T, unknown, T, unknown>;

export interface DealRisksAndMitigantsFormProps {
  item?: DealRisksAndMitigants;
  onCancel?: () => void;
  onAction?: (file: DealRisksAndMitigantsPayload) => void;
  cancelText?: string;
  actionText?: string;
  useMutation?: GenericDealRisksAndMitigantsUseMutation;
}

export interface DealRisksAndMitigantsModalState
  extends DealRisksAndMitigantsFormProps {
  Form: ComponentType<DealRisksAndMitigantsFormProps>;
  header?: string;
}

export interface DealRisksAndMitigantsModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    DealRisksAndMitigantsModalState {}
