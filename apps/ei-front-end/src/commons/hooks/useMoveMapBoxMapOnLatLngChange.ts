import { useEffect, useState } from "react";
import { MapRef } from "react-map-gl";

interface LatLng {
  longitude: number;
  latitude: number;
}

interface MoveMapBoxMapOnLatLngChange extends LatLng {
  longitude: number;
  latitude: number;
  mapRef: React.MutableRefObject<MapRef>;
  zoom?: number;
  enabled?: boolean;
  animate?: boolean;
  speed?: number;
  curve?: number;
}
export const useMoveMapBoxMapOnLatLngChange = ({
  mapRef,
  zoom = 10,
  enabled = true,
  animate = true,
  longitude,
  latitude,
  speed = 1.5,
  curve = 1.5,
}: MoveMapBoxMapOnLatLngChange) => {
  const [prevCenter, setPrevCenter] = useState<LatLng>({
    longitude: null,
    latitude: null,
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (
      prevCenter.latitude === latitude &&
      prevCenter.longitude === longitude
    ) {
      return;
    }

    if (latitude && longitude) {
      setTimeout(() => {
        mapRef.current?.flyTo({
          animate,
          zoom,
          speed,
          curve,
          essential: true,
          center: [Number(longitude), Number(latitude)],
        });
      }, 500);
    }
    setPrevCenter({
      latitude: latitude,
      longitude: longitude,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, enabled]);
};
