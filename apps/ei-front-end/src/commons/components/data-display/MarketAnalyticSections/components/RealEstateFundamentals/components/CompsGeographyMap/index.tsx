import { CompsMap } from "@/acquisitions/components/data-display/CompsMap";
import { useAllCompstackComps } from "@/acquisitions/services/queries/market-analytics";
import {
  CompstackComp,
  FiltersByMarket,
  FiltersBySubMarket,
} from "@/acquisitions/typings/market-analytics";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import {
  GenericFilterPayload,
  IsLoadingProp,
  IsRefetchingProp,
} from "@/commons/typings";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { getCompstackCompId } from "@/modules/acquisitions/utils/compstack-comps";
import { MapIcon } from "@heroicons/react/24/outline";
import { CardProps, setComponentRefs } from "in-ui-react";
import { forwardRef, memo, useCallback, useMemo, useRef } from "react";
import { MapRef } from "react-map-gl";
import { ActiveCompIdState } from "../../types";
import { CustomCompPopup } from "./components/CustomCompPopup";
import "./styles.css";

interface RealEstateFundamentalsPropsBase
  extends IsLoadingProp,
    IsRefetchingProp {
  deals?: Deal[];
  linkedComps?: CompstackComp[];
  setActiveComp: (args: ActiveCompIdState) => void;
  activeComp: ActiveCompIdState;
  filters?: GenericFilterPayload;
}
interface CompsGeographyMapByMarket
  extends FiltersByMarket,
    RealEstateFundamentalsPropsBase,
    CardProps {}
interface CompsGeographyMapBySubmarket
  extends FiltersBySubMarket,
    RealEstateFundamentalsPropsBase,
    CardProps {}

type CompsGeographyMapProps =
  | CompsGeographyMapByMarket
  | CompsGeographyMapBySubmarket;

export const CompsGeographyMap = memo(
  forwardRef<MapRef, CompsGeographyMapProps>(
    (
      {
        className,
        deals,
        linkedComps,
        isLoading,
        isRefetching,
        setActiveComp,
        activeComp,
        filters,
        ...props
      },
      forwardMapRef
    ) => {
      const isFilteringByMarket = "market" in props;
      const mapRef = useRef<MapRef>(null);
      const filterBy = isFilteringByMarket
        ? { market: props.market }
        : {
            submarket: props?.submarket,
            include_neighbors: "true",
          };

      const prefix = "acq-market-rent-comp__map";

      const getClasses = () => {
        const classes = [prefix];
        className && classes.push(className);
        return classes.join(" ");
      };

      const {
        data: comps,
        isLoading: isLoadingComps,
        isRefetching: isRefetchingComps,
      } = useAllCompstackComps({
        type: "all",
        ...filterBy,
        ...filters,
      });

      const memoActiveComp: CompstackComp | null = useMemo(() => {
        const comp = comps?.find(
          (comp) => getCompstackCompId(comp) === activeComp?.activeCompId
        );

        if (
          comp &&
          comp?.latitude &&
          comp?.longitude &&
          activeComp?.moveToComp
        ) {
          setTimeout(() => {
            mapRef.current?.flyTo({
              essential: true,
              zoom: 14,
              center: [Number(comp.longitude), Number(comp.latitude)],
            });
          }, 500);
        }

        return comp;
      }, [activeComp, comps]);

      const loading = isLoading;
      const refreshing = isRefetching || isRefetchingComps || isLoadingComps;

      const onClickComp = useCallback(
        (comp: CompstackComp) => {
          setActiveComp({
            activeCompId: getCompstackCompId(comp),
          });
        },
        [setActiveComp]
      );

      return (
        <CardWithHeader
          title="Comps map"
          icon={<MapIcon />}
          isLoading={loading}
          isRefetching={refreshing}
          className={getClasses()}
          skeletonHeight={350}
          {...props}
        >
          <section className="acq-market-rent-comp__map">
            <CompsMap
              ref={setComponentRefs(mapRef, forwardMapRef)}
              comps={comps || []}
              onCompClick={onClickComp}
              activeComp={memoActiveComp}
              deals={deals}
              dealComps={linkedComps}
            >
              <CustomCompPopup
                comp={memoActiveComp}
                longitude={Number(memoActiveComp?.longitude)}
                latitude={Number(memoActiveComp?.latitude)}
                onClose={() => {
                  setActiveComp({
                    activeCompId: null,
                  });
                }}
              />
            </CompsMap>
          </section>
        </CardWithHeader>
      );
    }
  )
);

CompsGeographyMap.displayName = "CompsGeographyMap";
