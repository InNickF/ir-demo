import { UseFormRegisterReturn } from "react-hook-form";

export const inputRegisterWithRequiredAttribute = (
  register: UseFormRegisterReturn<string>
): UseFormRegisterReturn<string> & {
  required: boolean;
} => {
  return {
    ...register,
    required: true,
  };
};
