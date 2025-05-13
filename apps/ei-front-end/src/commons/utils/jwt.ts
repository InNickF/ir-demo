import { ITokens } from "@/commons/typings";

export const getTokensFromStorage = (): ITokens => {
  const access = window.localStorage.getItem("access");
  const refresh = window.localStorage.getItem("refresh");
  return { access, refresh } as ITokens;
};

export const setTokensToStorage = (tokens: ITokens): void => {
  window.localStorage.setItem("access", tokens.access);
  window.localStorage.setItem("refresh", tokens.refresh);
};

export const setAccessTokenToStorage = (
  token: Pick<ITokens, "access">
): void => {
  window.localStorage.setItem("access", token.access);
};

export const removeTokensFromStorage = (): void => {
  window.localStorage.removeItem("access");
  window.localStorage.removeItem("refresh");
};
