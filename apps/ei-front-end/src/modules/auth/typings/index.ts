export type AuthStates = "login" | "forgot" | "reset";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ResetFormData {
  newPassword: LoginFormData["password"];
  confirmPassword: LoginFormData["password"];
}

export interface ForgotFormData {
  email: LoginFormData["email"];
}
