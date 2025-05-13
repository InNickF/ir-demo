import { axios } from "@/commons/services/clients";
import { ForgotFormData, LoginFormData } from "../typings";
import { TokensSchema } from "@/commons/typings";

export const login = async ({ email, password }: LoginFormData) => {
  return TokensSchema.parse({
    access: "access",
    refresh: "refresh",
  });
};

export const forgot = async ({ email }: ForgotFormData) => {
  await axios.post("/api/users/request-new-password/", {
    email,
    path: "auth",
  });
};

export const reset = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  const response = await axios.post("/api/users/reset-password/", {
    token: token,
    new_password: password,
  });
  return response.data as string;
};
