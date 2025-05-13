import { useMapStyles } from "@/acquisitions/components/data-display/CompsMap/hooks/useMapStyles";
import { useMoveMapBoxMapOnLatLngChange } from "@/commons/hooks/useMoveMapBoxMapOnLatLngChange";
import { GeoFeature } from "@/commons/typings/geojson";
import { maps } from "@/commons/utils";
import { DealMarker } from "@/modules/acquisitions/components/data-display/maps/DealMarker";
import { DrivingRoutePropertiesSchema } from "@/modules/acquisitions/schemas/market-analytics";
import {
  DrivingRouteFeature,
  PropertyWarehouse,
} from "@/modules/acquisitions/typings/market-analytics";
import { Feature, FeatureCollection, LineString, Point } from "geojson";
import { Empty, setComponentRefs } from "in-ui-react";
import mapboxgl from "mapbox-gl";
import { MapboxStyleDefinition } from "mapbox-gl-style-switcher";
import { forwardRef, useMemo, useRef } from "react";
import { Layer, Map as MapBox, MapRef, Source, ViewState } from "react-map-gl";
import {
  GetLastLineStringFeaturePointAsPointFeature,
  generateDrivingRoutePopupContent,
  getDrivingColorLines,
} from "./utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_PUBLIC_TOKEN;

interface WarehousesMapProps {
  warehouses: PropertyWarehouse[];
  drivingRoutes?: DrivingRouteFeature[];
  initialViewState?: ViewState;
  stylesMap?: MapboxStyleDefinition[];
  dealLatitude?: number;
  dealLongitude?: number;
  zoomLatitude?: number;
  zoomLongitude?: number;
}

export const WarehousesMap = forwardRef<MapRef, WarehousesMapProps>(
  (
    {
      warehouses,
      drivingRoutes,
      dealLatitude,
      dealLongitude,
      stylesMap = null,
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
    const mapRef = useRef<MapRef>(null);
    const popupRef = useRef(null);
    const layerIds = useMemo(() => {
      return (
        drivingRoutes
          ?.map((route) => [
            `driving-route-layer-${route?.properties?.name}`,
            `driving-route-point-layer-${route?.properties?.name}`,
          ])
          ?.flat() || []
      );
    }, [drivingRoutes]);

    useMoveMapBoxMapOnLatLngChange({
      mapRef,
      latitude: zoomLatitude || dealLatitude ? Number(dealLatitude) : null,
      longitude: zoomLongitude || dealLongitude ? Number(dealLongitude) : null,
      animate: false,
      zoom: 11,
    });

    const { style, theme } = useMapStyles({ stylesMap });

    const heatmapData: FeatureCollection<Point, PropertyWarehouse> =
      useMemo(() => {
        const points: Feature<Point, PropertyWarehouse>[] =
          warehouses?.map((property) => ({
            type: "Feature",
            properties: property,
            geometry: {
              type: "Point",
              coordinates: [
                Number(property.longitude),
                Number(property.latitude),
              ],
            },
          })) || [];

        return {
          type: "FeatureCollection",
          features: points,
        } as FeatureCollection<Point, PropertyWarehouse>;
      }, [warehouses]);

    return MAPBOX_TOKEN ? (
      <MapBox
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
              const feature = features[0] as unknown as GeoFeature<
                typeof DrivingRoutePropertiesSchema
              >;
              const popupContent = generateDrivingRoutePopupContent(feature);

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
        <Source type="geojson" data={heatmapData}>
          <Layer
            type="heatmap"
            paint={{
              "heatmap-weight": {
                property: "count",
                type: "exponential",
                stops: [
                  [0, 0],
                  [100, 1],
                ],
              },
              "heatmap-intensity": 1,
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(33,102,172,0)",
                0.2,
                "rgb(103,169,207)",
                0.4,
                "rgb(209,229,240)",
                0.6,
                "rgb(253,219,199)",
                0.8,
                "rgb(239,138,98)",
                1,
                "rgb(178,24,43)",
              ],
              "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                5,
                10,
                20,
              ],
              "heatmap-opacity": {
                default: 1,
                stops: [
                  [7, 1],
                  [15, 0.5],
                ],
              },
            }}
          />
        </Source>
        {dealLatitude && dealLongitude ? (
          <DealMarker longitude={dealLongitude} latitude={dealLatitude} />
        ) : null}

        {drivingRoutes?.map((route, index) => (
          <>
            <Source
              key={`driving-route-source-${route.properties?.name}`}
              id={`driving-route-source-${route.properties?.name}`}
              type="geojson"
              data={route as unknown as Feature<LineString>}
            >
              <Layer
                id={`driving-route-layer-${route.properties?.name}-opacity`}
                type="line"
                source={`driving-route-source-${route.properties?.name}`}
                paint={{
                  "line-color": theme.includes("dark") ? "#333333" : "#ffffff",
                  "line-width": 4,
                }}
              />
              <Layer
                id={`driving-route-layer-${route.properties?.name}`}
                type="line"
                source={`driving-route-source-${route.properties?.name}`}
                paint={{
                  "line-color": getDrivingColorLines({ index }),
                  "line-width": 2.5,
                }}
              />
            </Source>
            {/* A source to show a point using the last coordinate of every route */}
            <Source
              key={`driving-route-point-source-${route.properties?.name}`}
              id={`driving-route-point-source-${route.properties?.name}`}
              type="geojson"
              data={
                GetLastLineStringFeaturePointAsPointFeature(
                  route
                ) as unknown as Feature<LineString>
              }
            >
              <Layer
                id={`driving-route-point-layer-${route.properties?.name}`}
                type="circle"
                source={`driving-route-point-source-${route.properties?.name}`}
                paint={{
                  "circle-color": getDrivingColorLines({ index }),
                  "circle-radius": 5,
                  "circle-stroke-color": theme.includes("dark")
                    ? "#333333"
                    : "#ffffff",
                  "circle-stroke-width": 1.5,
                }}
              />
            </Source>
          </>
        ))}
      </MapBox>
    ) : (
      <div className="h-full flex items-center justify-center">
        <Empty className="mb-12" description={<p>Unable to load map.</p>} />
      </div>
    );
  }
);

WarehousesMap.displayName = "WarehousesMap";
