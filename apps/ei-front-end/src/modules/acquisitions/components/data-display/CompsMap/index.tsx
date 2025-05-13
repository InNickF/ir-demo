import { DealMarker } from "@/acquisitions/components/data-display/maps/DealMarker";
import { Deal } from "@/acquisitions/typings/deals";
import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { maps } from "@/commons/utils/index";
import { Empty, LoadingLine } from "in-ui-react";
import {
  MapboxStyleDefinition,
  MapboxStyleSwitcherOptions,
} from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import { CSSProperties, forwardRef, useEffect } from "react";
import { Map as MapBox, MapProps, MapRef, ViewState } from "react-map-gl";
import { CompsMarkers } from "./components/CompsMarkets";
import { useCompsFinderMapHeight } from "./hooks/useCompsFinderMapHeight";
import { useMapStyles } from "./hooks/useMapStyles";
import "./styles.css";

export interface CompsFinderMapProps
  extends IsLoadingProp,
    IsRefetchingProp,
    Omit<
      MapProps,
      | "ref"
      | "initialViewState"
      | "mapboxAccessToken"
      | "mapStyle"
      | "attributionControl"
    > {
  initialViewState?: ViewState;
  fullScreenControl?: boolean;
  navigationControl?: boolean;
  geolocateControl?: boolean;
  stylesMap?: MapboxStyleDefinition[];
  optionsSwitchControl?: MapboxStyleSwitcherOptions;
  comps?: CompstackComp[];
  onCompClick: (comp: CompstackComp) => void;
  activeComp?: CompstackComp;
  dealComps?: CompstackComp[];
  deals?: Deal[];
  onDealClick?: (deal: Deal) => void;
  className?: string;
}

export const CompsMap = forwardRef<MapRef, CompsFinderMapProps>(
  (
    {
      initialViewState = {
        longitude: maps.USA_GEOLOCATION.longitude,
        latitude: maps.USA_GEOLOCATION.latitude,
        zoom: 2.5,
        bearing: 0,
        pitch: 0,
        padding: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
      },
      stylesMap = null,
      optionsSwitchControl = null,
      comps = [],
      onCompClick,
      children,
      activeComp,
      dealComps = [],
      deals = [],
      onDealClick,
      isLoading = false,
      isRefetching = false,
      className,
      ...props
    },
    ref
  ) => {
    const MAP_BOX_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_PUBLIC_TOKEN;
    const { MemoMapboxSwitcherControl, defaultOptionStyle, style, styles } =
      useMapStyles({ optionsSwitchControl, stylesMap });

    const mapHeight = useCompsFinderMapHeight();
    const finalHeight: string = mapHeight ? `${mapHeight}px` : "100%";

    const getClasses = (): string => {
      const classes = ["acq-comps-finder-map"];
      className && classes.push(className);
      return classes.join(" ");
    };

    useEffect(
      function resizeOnDataChange() {
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 50);
      },
      [deals, comps]
    );

    return (
      <div
        className={getClasses()}
        style={
          {
            "--map-height": finalHeight,
          } as CSSProperties
        }
      >
        <LoadingLine persist isActive={isLoading || isRefetching} />
        {MAP_BOX_TOKEN ? (
          <MapBox
            ref={ref}
            initialViewState={initialViewState}
            mapboxAccessToken={MAP_BOX_TOKEN}
            mapStyle={style}
            attributionControl={false}
            {...props}
          >
            <MemoMapboxSwitcherControl
              styles={styles}
              options={defaultOptionStyle}
            />
            <CompsMarkers
              activeComp={activeComp}
              comps={comps}
              dealComps={dealComps}
              onCompClick={onCompClick}
            />
            {deals?.map((deal) => (
              <DealMarker
                key={deal.id}
                latitude={Number(deal?.latitude) || null}
                longitude={Number(deal?.longitude) || null}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  onDealClick?.(deal);
                }}
              />
            ))}
            {children}
          </MapBox>
        ) : (
          <div className="h-full flex items-center justify-center">
            <Empty className="mb-12" description={<p>Unable to load map.</p>} />
          </div>
        )}
      </div>
    );
  }
);

CompsMap.displayName = "CompMap";
