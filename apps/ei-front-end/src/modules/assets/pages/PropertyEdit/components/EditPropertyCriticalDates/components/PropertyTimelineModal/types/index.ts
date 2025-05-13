import { PropertyTimeline } from "@/modules/assets/typings/property";
import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "in-ui-react";
import { ComponentType } from "react";

export type GenericPropertyTimelineUseMutation = <
  T extends PropertyTimeline
>() => UseMutationResult<T, unknown, T, unknown>;

export interface PropertyTimelineFormProps {
  item?: PropertyTimeline;
  onCancel?: () => void;
  onAction?: (timeline: PropertyTimeline) => void;
  cancelText?: string;
  actionText?: string;
  useMutation?: GenericPropertyTimelineUseMutation;
}

export interface PropertyTimelineModalState extends PropertyTimelineFormProps {
  Form: ComponentType<PropertyTimelineFormProps>;
  header?: string;
}

export interface PropertyTimelineModalProps
  extends Omit<ModalProps, "children" | "disclosure">,
    PropertyTimelineModalState {}
