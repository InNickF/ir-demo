import { GenericFormFieldRenderer } from "@/commons/typings/forms";
import {
  CompstackComp,
  CompstackCompKeysPayloadByType,
  CompstackCompType,
} from "@/modules/acquisitions/typings/market-analytics";
import { UseMutationResult } from "@tanstack/react-query";
import { HTMLAttributes, ReactNode } from "react";
import { UseFormProps, UseFormReturn } from "react-hook-form";

export type GenericCompstackCompFormFieldRenderer =
  GenericFormFieldRenderer<CompstackComp>;

export type CompstackCompFormRenderFunctionProps<T extends CompstackCompType> =
  {
    state: UseFormReturn<CompstackCompKeysPayloadByType[T]>;
    HTMLAttributes?: HTMLAttributes<HTMLElement>;
  };

export type CompstackCompFormFieldRenderer<T extends CompstackCompType> =
  GenericFormFieldRenderer<CompstackCompKeysPayloadByType[T]>;

export type GenericCompstackCompFormUseMutation = () => UseMutationResult<
  string,
  unknown
>;
export interface GenericCompstackCompFormProps<T extends CompstackCompType> {
  useMutation: GenericCompstackCompFormUseMutation;
  modalIsVisible: boolean;
  rhfProps?: UseFormProps<CompstackCompKeysPayloadByType[T]>;
  children?: ReactNode;
  compType: CompstackCompType;
  onSave?: () => void;
  onClose?: () => void;
}
