import { LocalDealRoomItem } from "@/acquisitions/typings/deals";
import { DealRoomFilters } from "@/acquisitions/typings/filters";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericDealRoomUseMutation = <
  T extends LocalDealRoomItem
>() => UseMutationResult<T, unknown, T, unknown>;

export interface LocalDealRoomFormProps {
  item?: LocalDealRoomItem;
  labels: DealRoomFilters;
  cancelText?: string;
  actionText?: string;
  onCancel?: () => void;
  onAction?: (file: LocalDealRoomItem) => void;
}

export interface LocalDealRoomModalState extends LocalDealRoomFormProps {
  Form: ComponentType<LocalDealRoomFormProps>;
  header?: string;
}

export interface LocalDealRoomModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    LocalDealRoomModalState {}
