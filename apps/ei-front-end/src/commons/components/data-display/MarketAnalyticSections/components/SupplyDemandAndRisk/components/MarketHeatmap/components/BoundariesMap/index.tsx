import { useMapStyles } from "@/acquisitions/components/data-display/CompsMap/hooks/useMapStyles";
import { useMoveMapBoxMapOnLatLngChange } from "@/commons/hooks/useMoveMapBoxMapOnLatLngChange";
import {
  convertToTitleCase,
  humanizeSnakeCase,
} from "@/commons/model-in/formatters/utils";
import { maps } from "@/commons/utils";
import { DealMarker } from "@/modules/acquisitions/components/data-display/maps/DealMarker";
import { IndustrialGeographiesMetricsKeysSchema } from "@/modules/acquisitions/schemas/market-analytics";
import {
  IndustrialGeographiesPropertiesWithMetrics,
  IndustrialGeographiesWithMetrics,
} from "@/modules/acquisitions/typings/market-analytics";
import { industrialGeographiesPropertiesWithMetricsFormatter } from "@/modules/acquisitions/utils/formatters/industrial-geography-formatters";
import { Divider, Empty, setComponentRefs } from "in-ui-react";
import mapboxgl from "mapbox-gl";
import { MapboxStyleDefinition } from "mapbox-gl-style-switcher";
import { FC, forwardRef, useCallback, useMemo, useRef } from "react";
import {
  Layer,
  MapRef,
  Map as Mapbox,
  MapboxGeoJSONFeature,
  Popup,
  Source,
  ViewState,
} from "react-map-gl";
import "./styles.css";
import { getColorBasedOnHeatMapMetricAndValue } from "./utils";

interface BoundariesMapProps {
  data: IndustrialGeographiesWithMetrics[];
  initialViewState?: ViewState;
  stylesMap?: MapboxStyleDefinition[];
  focusedKey: keyof typeof IndustrialGeographiesMetricsKeysSchema.Values;
  pointLatitude?: number;
  pointLongitude?: number;
  zoomLatitude?: number;
  zoomLongitude?: number;
}
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_PUBLIC_TOKEN;

type MapBoxFeature = Omit<MapboxGeoJSONFeature, "properties"> &
  IndustrialGeographiesWithMetrics;

type FeatureInformation = {
  longitude: number;
  latitude: number;
  feature: MapBoxFeature;
};

export const BoundariesMap = forwardRef<MapRef, BoundariesMapProps>(
  (
    {
      data,
      stylesMap = null,
      focusedKey,
      pointLatitude,
      pointLongitude,
      zoomLatitude,
      zoomLongitude,
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
    },
    ref
  ) => {
    const hasData = data?.length;

    const { style } = useMapStyles({ stylesMap });
    const mapRef = useRef<MapRef>(null);

    useMoveMapBoxMapOnLatLngChange({
      mapRef,
      longitude:
        zoomLatitude || hasData ? data[0].properties.centroid[0] : null,
      latitude:
        zoomLongitude || hasData ? data[0].properties.centroid[1] : null,
      animate: false,
    });

    const generatePopupContent = (feature, focusedKey) => {
      const keysToIgnore: Array<
        keyof IndustrialGeographiesPropertiesWithMetrics
      > = ["geography_name", "centroid", "geography_type", focusedKey];

      const focusedMetric = `<p class="text-sm font-bold">${convertToTitleCase(
        humanizeSnakeCase(focusedKey)
      )}: ${
        industrialGeographiesPropertiesWithMetricsFormatter[focusedKey]
          ? industrialGeographiesPropertiesWithMetricsFormatter[focusedKey](
              feature.properties[focusedKey]
            )
          : feature.properties[focusedKey]
      }</p>`;

      const otherMetrics = Object.keys(feature.properties)
        .filter(
          (key: keyof IndustrialGeographiesPropertiesWithMetrics) =>
            !keysToIgnore.includes(key)
        )
        .map((key) => {
          const formatter =
            industrialGeographiesPropertiesWithMetricsFormatter[key];
          const propertyValue = feature.properties[key];

          return `<p class="text-sm">${convertToTitleCase(
            humanizeSnakeCase(key)
          )}: ${formatter ? formatter(propertyValue) : propertyValue}</p>`;
        })
        .join("");

      return `<h6 class="break-words whitespace-pre-wrap w-full">${feature.properties.geography_name}</h6>
          <div class="my-1 border-b border-silver"></div>
          ${focusedMetric}
          ${otherMetrics}`;
    };

    const popupRef = useRef(null);
    const layerIds = data?.map(
      (feature) => `boundaries-layer-${feature.properties.geography_name}`
    );
    return MAPBOX_TOKEN ? (
      <Mapbox
        ref={setComponentRefs(mapRef, ref)}
        initialViewState={initialViewState}
        mapStyle={style}
        mapboxAccessToken={MAPBOX_TOKEN}
        onMouseMove={(e) => {
          if (mapRef.current) {
            const { point } = e;
            const { lng, lat } = e.lngLat;
            const features = mapRef.current.queryRenderedFeatures(point, {
              layers: layerIds,
            });
            if (features.length > 0) {
              const feature = features[0] as unknown as MapBoxFeature;
              const popupContent = generatePopupContent(feature, focusedKey);

              // Remove any existing popup
              if (popupRef.current) {
                popupRef.current.remove();
              }

              // Create new popup and add to the map
              popupRef.current = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                className: "boundaries-map__pop-up",
              })
                .setLngLat([lng, lat])
                .setHTML(popupContent)
                .addTo(mapRef.current.getMap());
            } else {
              // If there's a popup, remove it
              if (popupRef.current) {
                popupRef.current.remove();
                popupRef.current = null;
              }
            }
          }
        }}
        onMouseOut={() => {
          // If there's a popup, remove it
          if (popupRef.current) {
            popupRef.current.remove();
            popupRef.current = null;
          }
        }}
      >
        {data?.map((feature) => {
          return (
            <>
              <Source
                key={`boundaries-source-${feature.properties.geography_name}`}
                id={`boundaries-source-${feature.properties.geography_name}`}
                type="geojson"
                data={feature as unknown as MapboxGeoJSONFeature}
              >
                <Layer
                  id={`boundaries-layer-${feature.properties.geography_name}`}
                  type="fill"
                  source={`boundaries-source-${feature.properties.geography_name}`}
                  paint={{
                    "fill-color": getColorBasedOnHeatMapMetricAndValue({
                      metric: focusedKey,
                      value: feature.properties[focusedKey],
                    }),
                    "fill-opacity": 0.4,
                  }}
                />
                <Layer
                  id={`boundaries-outline-layer-${feature.properties.geography_name}`}
                  type="line"
                  source={`boundaries-source-${feature.properties.geography_name}`}
                  paint={{
                    "line-color": getColorBasedOnHeatMapMetricAndValue({
                      metric: focusedKey,
                      value: feature.properties[focusedKey],
                    }),
                    "line-width": 2,
                  }}
                />
              </Source>
            </>
          );
        })}
        {pointLatitude && pointLongitude ? (
          <DealMarker longitude={pointLongitude} latitude={pointLatitude} />
        ) : null}
      </Mapbox>
    ) : (
      <div className="h-full flex items-center justify-center">
        <Empty className="mb-12" description={<p>Unable to load map.</p>} />
      </div>
    );
  }
);
interface FeaturePopupProps {
  featureInfo: FeatureInformation | null;
  focusedKey: keyof typeof IndustrialGeographiesMetricsKeysSchema.Values;
}
export const FeaturePopup: FC<FeaturePopupProps> = ({
  featureInfo,
  focusedKey,
}) => {
  const keysToIgnore: Array<keyof IndustrialGeographiesPropertiesWithMetrics> =
    useMemo(
      () => ["geography_name", "centroid", "geography_type", focusedKey],
      [focusedKey]
    );

  const FocusedMetric = useCallback(() => {
    return (
      <p className="text-sm font-bold">
        {convertToTitleCase(humanizeSnakeCase(focusedKey))}:{" "}
        {industrialGeographiesPropertiesWithMetricsFormatter[focusedKey]
          ? industrialGeographiesPropertiesWithMetricsFormatter[focusedKey](
              featureInfo?.feature?.properties[focusedKey]
            )
          : featureInfo?.feature?.properties[focusedKey]}
      </p>
    );
  }, [focusedKey, featureInfo]);

  const RestOfMetrics = useCallback(() => {
    return (
      <>
        {Object.keys(featureInfo?.feature?.properties).map(
          (key: keyof IndustrialGeographiesPropertiesWithMetrics) => {
            if (!keysToIgnore.includes(key)) {
              const formatter =
                industrialGeographiesPropertiesWithMetricsFormatter[key];
              const propertyValue = featureInfo?.feature?.properties[key];
              return (
                <p key={key} className="text-sm">
                  {convertToTitleCase(humanizeSnakeCase(key))}:{" "}
                  {formatter
                    ? formatter(propertyValue as never)
                    : propertyValue}
                </p>
              );
            }
            return null;
          }
        )}
      </>
    );
  }, [featureInfo, keysToIgnore]);

  return (
    featureInfo && (
      <Popup
        className="acq-custom-map-popup boundaries-map__pop-up"
        longitude={featureInfo.longitude}
        latitude={featureInfo.latitude}
        closeButton={false}
        closeOnClick={false}
      >
        <h6 className="w-full break-words whitespace-pre-wrap">
          {featureInfo?.feature?.properties?.geography_name}
        </h6>
        <Divider className="my-1" />
        <FocusedMetric />
        <RestOfMetrics />
      </Popup>
    )
  );
};

BoundariesMap.displayName = "BoundariesMap";
