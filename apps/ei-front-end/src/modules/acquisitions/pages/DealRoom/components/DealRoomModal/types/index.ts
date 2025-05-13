import {
  DealRoomItem,
  LocalDealRoomItem,
  DealRoomItemPayload,
} from "@/acquisitions/typings/deals";
import { DealRoomFilters } from "@/acquisitions/typings/filters";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericDealRoomUseMutation = <
  T extends DealRoomItem | DealRoomItemPayload
>() => UseMutationResult<T, unknown, T, unknown>;

export interface DealRoomFormProps {
  item?: DealRoomItem;
  labels: DealRoomFilters;
  onCancel?: () => void;
  onAction?: (file: DealRoomItem | LocalDealRoomItem) => void;
  cancelText?: string;
  actionText?: string;
  useMutation?: GenericDealRoomUseMutation;
}

export interface DealRoomModalState extends DealRoomFormProps {
  Form: ComponentType<DealRoomFormProps>;
  header?: string;
}

export interface DealRoomModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    DealRoomModalState {}
