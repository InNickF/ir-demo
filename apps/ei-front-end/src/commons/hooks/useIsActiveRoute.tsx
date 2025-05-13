import { useRouter } from "next/router";

interface useRouterIsActiveParams {
  linksToMatch?: string[];
  regexToMatch: RegExp;
  route: string;
  routeIncludes?: boolean;
}

export const useIsActiveRoute = ({
  regexToMatch,
  linksToMatch,
  route,
  routeIncludes,
}: useRouterIsActiveParams) => {
  const router = useRouter();

  const isActive = () => {
    if (regexToMatch) {
      return regexToMatch.test(router.asPath);
    }
    if (linksToMatch) {
      return linksToMatch.includes(router.asPath);
    }
    if (routeIncludes) {
      return router.asPath.includes(`${route}`);
    }
    return router.asPath === route;
  };

  return isActive();
};
