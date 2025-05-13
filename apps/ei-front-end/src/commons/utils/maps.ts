import {
  MapboxStyleDefinition,
  MapboxStyleSwitcherOptions,
} from "mapbox-gl-style-switcher";

export const USA_GEOLOCATION: { latitude: number; longitude: number } = {
  latitude: 37.09024,
  longitude: -95.712891,
};
export const SATELLITE_STREETS_STYLE_TITLE = "Satellite Streets";

export const DEFAULT_STYLES_MAP: MapboxStyleDefinition[] = [
  {
    title: "Dark",
    uri: "mapbox://styles/mapbox/dark-v11",
  },
  {
    title: "Light",
    uri: "mapbox://styles/mapbox/light-v11",
  },
  {
    title: "Streets",
    uri: "mapbox://styles/mapbox/streets-v12",
  },
  {
    title: "Satellite",
    uri: "mapbox://styles/mapbox/satellite-v9",
  },
  {
    title: SATELLITE_STREETS_STYLE_TITLE,
    uri: "mapbox://styles/mapbox/satellite-streets-v12",
  },
  {
    title: "Outdoors",
    uri: "mapbox://styles/mapbox/outdoors-v12",
  },
  {
    title: "Navigation Day",
    uri: "mapbox://styles/mapbox/navigation-day-v1",
  },
  {
    title: "Navigation Night",
    uri: "mapbox://styles/mapbox/navigation-night-v1",
  },
];

export const DEFAULT_OPTION_STYLE_MAP: MapboxStyleSwitcherOptions = {
  defaultStyle: "Satellite",
};

export const getSatelliteStreetStyleURI = (): string => {
  return (
    DEFAULT_STYLES_MAP.find(
      (style) => style.title === SATELLITE_STREETS_STYLE_TITLE
    )?.uri || ""
  );
};
