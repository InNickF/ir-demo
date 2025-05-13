import {
  CompstackCompKeysPayloadByType,
  CompstackCompType,
} from "@/modules/acquisitions/typings/market-analytics";
import { CompstackCompFormFieldRenderer } from "../../../types";
import { UseFormReturn } from "react-hook-form";

export interface CompBriefAndFullFormProps<T extends CompstackCompType> {
  fields: CompstackCompFormFieldRenderer<T>[];
  formState: UseFormReturn<CompstackCompKeysPayloadByType[T]>;
  compType?: T;
  isFullForm?: boolean;
}
