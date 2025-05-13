import { Map } from "@/commons/components/maps/Map";
import { GenericFilterPayload, IsLoadingProp } from "@/commons/typings";
import { getSatelliteStreetStyleURI } from "@/commons/utils/maps";
import { LegacyProperty } from "@/modules/assets/typings/property";
import { PropertyGeographyMapLocation } from "@/modules/assets/typings/tenants";
import { getBoundsOfArray } from "@/modules/assets/utils/helpers";
import { Skeleton } from "in-ui-react";
import { FC, useEffect, useRef, useState } from "react";
import { MapRef } from "react-map-gl";
import { CustomPropertyPopup } from "./CustomPropertyPopup";

const getMarkerData = (
  data: LegacyProperty[]
): PropertyGeographyMapLocation[] => {
  const calculateMarkerSize = (area: number) => {
    return `${Math.round(area / 3_000) / 2}px`;
  };

  if (data?.length > 0) {
    return data?.map((item) => ({
      latitude: Number(item?.latitude),
      longitude: Number(item?.longitude),
      color: "rgba(19, 52, 99,1)",
      customPopup: (
        <CustomPropertyPopup key={item?.property_code} property={item} />
      ),
      customMarker: (
        <div
          className="rounded-full bg-success opacity-70"
          style={{
            width: calculateMarkerSize(item.dtotalarea),
            height: calculateMarkerSize(item.dtotalarea),
          }}
        />
      ),
      ...item,
    }));
  }
};

export const PropertyGeographyMap: FC<
  {
    data: LegacyProperty[];
    filters: GenericFilterPayload;
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
        markers={markers?.length > 0 ? markers : defaultMarkers}
        ref={ref}
        defaultStyle={getSatelliteStreetStyleURI()}
      />
    </div>
  );
};
