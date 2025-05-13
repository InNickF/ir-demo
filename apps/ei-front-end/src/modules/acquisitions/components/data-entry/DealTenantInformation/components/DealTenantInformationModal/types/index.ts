import {
  DealTenantInformation,
  DealTenantInformationPayload,
} from "@/acquisitions/typings/deals";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericDealTenantInformationUseMutation = <
  T extends DealTenantInformation | DealTenantInformationPayload
>() => UseMutationResult<T, unknown, T, unknown>;

export interface DealTenantInformationFormProps {
  item?: DealTenantInformation;
  onCancel?: () => void;
  onAction?: (file: DealTenantInformationPayload) => void;
  cancelText?: string;
  actionText?: string;
  useMutation?: GenericDealTenantInformationUseMutation;
}

export interface DealTenantInformationModalState
  extends DealTenantInformationFormProps {
  Form: ComponentType<DealTenantInformationFormProps>;
  header?: string;
}

export interface DealTenantInformationModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    DealTenantInformationModalState {}
