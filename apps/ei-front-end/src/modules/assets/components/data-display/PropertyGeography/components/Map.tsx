import { Map } from "@/commons/components/maps/Map";
import { IsLoadingProp } from "@/commons/typings";
import { getSatelliteStreetStyleURI } from "@/commons/utils/maps";
import { PropertyGeography } from "@/modules/assets/typings/properties";
import { PropertyGeographyMapLocation } from "@/modules/assets/typings/tenants";
import { getBoundsOfArray } from "@/modules/assets/utils/helpers";
import { Skeleton } from "in-ui-react";
import { FC, useEffect, useRef, useState } from "react";
import { MapRef } from "react-map-gl";
import { CustomPropertyPopup } from "./CustomPropertyPopup";

const getMarkerData = (
  data: PropertyGeography[]
): PropertyGeographyMapLocation[] => {
  const calculateMarkerSize = (area: number) => {
    const resizer = area > 400_000 ? 15_000 : 3_000;
    return `${Math.round(area / resizer) / 2}px`;
  };

  if (data?.length > 0) {
    return data?.map((item) => ({
      latitude: Number(item?.latitude),
      longitude: Number(item?.longitude),
      color: "rgba(19, 52, 99,1)",
      customPopup: (
        <CustomPropertyPopup key={item?.yardi_property_code} property={item} />
      ),
      customMarker: (
        <div
          className="rounded-full bg-success opacity-70"
          style={{
            width: calculateMarkerSize(item.rentable_building_area),
            height: calculateMarkerSize(item.rentable_building_area),
          }}
        />
      ),
      ...item,
    }));
  }
};

export const PropertyGeographyMap: FC<
  {
    data: PropertyGeography[];
  } & IsLoadingProp
> = ({ data, isLoading }) => {
  const [markers, setMarkers] = useState<PropertyGeographyMapLocation[]>([]);
  const defaultMarkers = getMarkerData(data);

  const ref = useRef<MapRef>(null);

  useEffect(() => {
    const { minLatitude, maxLatitude, minLongitude, maxLongitude } =
      getBoundsOfArray(data);
    setMarkers(defaultMarkers);
    ref?.current?.fitBounds([
      minLongitude,
      minLatitude,
      maxLongitude,
      maxLatitude,
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return isLoading ? (
    <Skeleton className="w-full h-96">
      <Skeleton.Avatar className="w-full h-96" shape="squared" />
    </Skeleton>
  ) : (
    <div className="asset-portfolio-map__container generic-entrance-animation">
      <Map
        defaultStyle={getSatelliteStreetStyleURI()}
        markers={markers?.length > 0 ? markers : defaultMarkers}
        ref={ref}
      />
    </div>
  );
};
