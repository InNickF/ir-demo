import { MarkerCustomProps } from "@/commons/typings";
import { maps } from "@/commons/utils/index";
import { setComponentRefs, useTheme, Empty } from "in-ui-react";
import {
  MapboxStyleDefinition,
  MapboxStyleSwitcherControl,
  MapboxStyleSwitcherOptions,
} from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map as MapBox,
  MapRef,
  NavigationControl,
  ViewState,
  useControl,
} from "react-map-gl";
import { GenericMarker } from "../Marker";
import { PopUp } from "../Popup";
import { useAutoResizeMap } from "./hooks/useAutoResizeMap";
import "./styles.css";

export interface MapProps {
  initialViewState?: ViewState;
  markers?: Array<MarkerCustomProps>;
  fullScreenControl?: boolean;
  navigationControl?: boolean;
  geolocateControl?: boolean;
  stylesMap?: MapboxStyleDefinition[];
  optionsSwitchControl?: MapboxStyleSwitcherOptions;
  defaultStyle?: string;
}

export const Map = forwardRef<MapRef, MapProps>(
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
      markers,
      navigationControl = false,
      fullScreenControl = true,
      geolocateControl = true,
      stylesMap = null,
      optionsSwitchControl = null,
      defaultStyle,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapRef>(null);

    const MAP_BOX_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_PUBLIC_TOKEN;
    const [selectedMarker, setSelectedMarker] =
      useState<MarkerCustomProps>(null);
    const { theme } = useTheme();

    const style = useMemo(() => {
      if (defaultStyle) return defaultStyle;

      return theme.includes("dark")
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11";
    }, [theme, defaultStyle]);

    const styles = useMemo(
      () => (stylesMap !== null ? stylesMap : maps?.DEFAULT_STYLES_MAP),
      [stylesMap]
    );

    const [defaultOptionStyle, setDefaultOptionStyle] =
      useState<MapboxStyleSwitcherOptions>(optionsSwitchControl || null);

    function MapboxSwitcherControl(props) {
      useControl<MapboxStyleSwitcherControl>(
        () => new MapboxStyleSwitcherControl(props.styles, props.options)
      );

      return null;
    }

    const MemoMapboxSwitcherControl = useMemo(() => MapboxSwitcherControl, []);

    const onClose = () => {
      setSelectedMarker(null);
    };

    useEffect(() => {
      const style = theme?.includes("dark") ? "Dark" : "Light";
      setDefaultOptionStyle((prev) => ({ ...prev, defaultStyle: style }));
    }, [theme]);

    useAutoResizeMap({
      containerRef,
      onResize: () => {
        mapRef?.current?.resize();
      },
    });

    return (
      <div ref={containerRef} className="map-box-wrapper">
        {MAP_BOX_TOKEN ? (
          <MapBox
            ref={setComponentRefs(mapRef, ref)}
            initialViewState={initialViewState}
            mapboxAccessToken={MAP_BOX_TOKEN}
            mapStyle={style}
            attributionControl={false}
          >
            {fullScreenControl ? <FullscreenControl /> : null}
            {navigationControl ? <NavigationControl /> : null}
            {geolocateControl ? <GeolocateControl /> : null}
            <MemoMapboxSwitcherControl
              styles={styles}
              options={defaultOptionStyle}
            />

            {markers?.map((marker, index) => (
              <GenericMarker
                key={index}
                longitude={Number(marker?.longitude)}
                latitude={Number(marker?.latitude)}
                onClick={() => setSelectedMarker(marker)}
              >
                {marker?.customMarker ? marker?.customMarker : null}
              </GenericMarker>
            ))}
            {selectedMarker && selectedMarker?.customPopup ? (
              <PopUp
                longitude={selectedMarker?.longitude}
                latitude={selectedMarker?.latitude}
                selectedMarker={selectedMarker}
                onClosePopup={onClose}
              />
            ) : null}
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

Map.displayName = "Map";
