import { CompstackCompFormFieldRenderer } from "../../types";
import { compstackCompsSaleAndLandCommonForm } from "./compstackCompCommonFormFields";

export const compstackCompLandForm: CompstackCompFormFieldRenderer<"land">[] = [
  ...compstackCompsSaleAndLandCommonForm,
];
