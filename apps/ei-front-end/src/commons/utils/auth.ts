import Router from "next/router";

export const AUTH_PREV_PATH_QUERY = "auth-redirect";

interface RedirectToLoginParams {
  path?: string;
  pushWithPrevPath?: boolean;
}
export const redirectToLogin = ({
  path = "/auth",
  pushWithPrevPath = true,
}: RedirectToLoginParams): void => {
  const url = new URL(window?.location?.href);
  const currentPathWithQueries = encodeURIComponent(url.pathname + url.search);
  const currentPage = url.pathname;
  const prevPathQueryValue =
    currentPage === "/" ? null : currentPathWithQueries;
  const query = prevPathQueryValue
    ? `?${AUTH_PREV_PATH_QUERY}=${prevPathQueryValue}`
    : "";
  const newPath = pushWithPrevPath ? `${path}${query}` : path;
  Router.push(newPath);
};

export const getAuthPrevPath = (): string | null => {
  const url = new URL(window?.location?.href);
  const prevPath = url.searchParams.get(AUTH_PREV_PATH_QUERY);
  return prevPath ? decodeURIComponent(prevPath) : null;
};
