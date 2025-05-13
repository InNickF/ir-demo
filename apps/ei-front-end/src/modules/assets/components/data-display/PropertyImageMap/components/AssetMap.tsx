import { MarkerCustomProps } from "@/commons/typings";
import { MapIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "in-ui-react";
import { forwardRef } from "react";
import { MapRef } from "react-map-gl";
import { Map } from "@/commons/components/maps/Map";

export interface AssetMapInteractions {
  onEnter: () => void;
  onLeave: () => void;
}

interface AssetMapProps extends AssetMapInteractions {
  longitude: number;
  latitude: number;
  goToGoogleMaps?: boolean;
  prefix?: string;
}

export const AssetMap = forwardRef<MapRef, AssetMapProps>(
  (
    {
      latitude,
      longitude,
      onEnter,
      onLeave,
      goToGoogleMaps = false,
      prefix = "asset-deal-map-and-image",
    },
    ref
  ) => {
    const getMarkerData = (): MarkerCustomProps[] => {
      return [
        {
          latitude: Number(latitude),
          longitude: Number(longitude),
          color: "rgba(19, 52, 99,1)",
        },
      ];
    };

    const GoToGoogleMapsButton = () => {
      const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      const getClasses = (): string => {
        const classes = [`${prefix}__google-map__button`];
        goToGoogleMaps && classes.push(`${prefix}__google-map__button--active`);
        return classes.join(" ");
      };

      return (
        <Button
          className={getClasses()}
          icon={<MapIcon />}
          as="a"
          target="_blank"
          href={googleMapsURL}
          kind="solid"
          size="small"
        >
          Go to Google maps
        </Button>
      );
    };

    return latitude && longitude ? (
      <Card
        className={`${prefix}__map`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <GoToGoogleMapsButton />
        <Map
          ref={ref}
          markers={getMarkerData()}
          initialViewState={{
            longitude: Number(longitude),
            latitude: Number(latitude),
            zoom: 15,
            bearing: 0,
            pitch: 0,
            padding: {
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            },
          }}
        />
      </Card>
    ) : null;
  }
);

AssetMap.displayName = "AssetMap";
