import { CustomCursor } from "@/commons/components/decoration/CustomCursor";
import { FullscreenLoader } from "@/commons/components/feedback/FullscreenLoader";
import { Notifications } from "@/commons/components/feedback/Notifications";
import { useInitSoundSystem } from "@/commons/components/feedback/Notifications/hooks/useInitSoundSystem";
import { Head } from "@/commons/components/general/Head";
import { useAutoSetAppContext } from "@/commons/hooks/useAutoSetAppContext";
import QueryProvider from "@/commons/services/managers/react-query";
import { useMe } from "@/commons/services/managers/react-query/queries/user";
import { AppPropsWithLayout } from "@/commons/typings";
import { useGSAP } from "@gsap/react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import gsap from "gsap";
import { ThemeProvider } from "in-ui-react";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "in-ui-react/style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/commons/styles/index.css";
import "@/acquisitions/styles/index.css";
import "../model-in";

gsap.registerPlugin(useGSAP);

export const importQueries = async (queryClient: QueryClient) => {
  const cachefiles = [
    "acq-deal-details-1",
    "acq-deal-details-2",
    "acq-deals",
    "acq-market-analytics",
    "acq-overview",
    "assets-fund-details",
    "assets-portfolios",
    "assets-properties",
    "debt-overview",
    "debt-risk-refi",
    "loan",
    "loans",
    "plv-form",
    "plv-individual",
    "plv-list",
  ] as const;

  const response = await Promise.all(
    // This return an array of arrays of promises that must be merge into one array
    cachefiles.map((file) => fetch(`/cache/${file}.json`))
  );
  const data = (await Promise.all(response.map((res) => res.json()))).flat();

  data.forEach(({ queryKey, state }) => {
    queryClient.setQueryData(queryKey, state.data);
  });
};

const CacheProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      importQueries(queryClient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data } = useMe();

  return <>{!data ? <FullscreenLoader /> : children}</>;
};

function IRManagement({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  useInitSoundSystem();
  useAutoSetAppContext();

  return (
    <>
      <CustomCursor />
      <ThemeProvider>
        <Head />
        <Notifications />
        <QueryProvider>
          <CacheProvider>
            {getLayout(<Component {...pageProps} />)}
          </CacheProvider>
        </QueryProvider>
      </ThemeProvider>
    </>
  );
}

export default IRManagement;
