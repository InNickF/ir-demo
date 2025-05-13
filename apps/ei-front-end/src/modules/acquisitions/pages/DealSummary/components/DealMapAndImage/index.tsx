import { Deal, DealImage } from "@/acquisitions/typings/deals";
import { ImageCarousel } from "@/commons/components/data-display/ImageCarousel";
import { ImageCarouselModal } from "@/commons/components/general/ImageCarouselModal";
import { Map } from "@/commons/components/maps/Map";
import { MarkerCustomProps } from "@/commons/typings";
import { getSatelliteStreetStyleURI } from "@/commons/utils/maps";
import { MapIcon } from "@heroicons/react/24/outline";
import { Button, Card, Empty } from "in-ui-react";
import { FC, HTMLAttributes, forwardRef, useRef, useState } from "react";
import { MapRef } from "react-map-gl";
import "./styles.css";

const prefix = "acq-deal-map-and-image";
export const DealMapAndImages: FC<
  HTMLAttributes<HTMLDivElement> & {
    longitude: Deal["longitude"];
    latitude: Deal["latitude"];
    images: DealImage[];
    goToGoogleMaps?: boolean;
  }
> = ({
  latitude,
  longitude,
  images = [],
  className,
  goToGoogleMaps = false,
  ...props
}) => {
  const noImages = !images?.length;

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    noImages && classes.push(`${prefix}--no-images`);
    return classes.join(" ");
  };
  const mustRender = (latitude && longitude) || images?.length;

  const map = useRef<MapRef>(null);
  const resizeMap = () => {
    setTimeout(() => {
      map.current?.resize();
    }, 350);
  };
  return mustRender ? (
    <div {...props} className={getClasses()}>
      <DealImages images={images} onEnter={resizeMap} onLeave={resizeMap} />
      <DealMap
        ref={map}
        latitude={latitude}
        longitude={longitude}
        onEnter={resizeMap}
        onLeave={resizeMap}
        goToGoogleMaps={goToGoogleMaps}
      />
    </div>
  ) : (
    <Card>
      <Empty />
    </Card>
  );
};
interface Interactions {
  onEnter: () => void;
  onLeave: () => void;
}
interface DealMapProps extends Interactions {
  longitude: Deal["longitude"];
  latitude: Deal["latitude"];
  goToGoogleMaps?: boolean;
}
const DealMap = forwardRef<MapRef, DealMapProps>(
  ({ latitude, longitude, onEnter, onLeave, goToGoogleMaps = false }, ref) => {
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
          defaultStyle={getSatelliteStreetStyleURI()}
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
DealMap.displayName = "DealMap";

const DealImages: FC<
  {
    images: DealImage[];
  } & Interactions
> = ({ images, onEnter, onLeave }) => {
  const [modal, setModal] = useState(false);
  const noImages = !images?.length;
  const getClasses = () => {
    const classes = [`${prefix}__images`];
    return classes.join(" ");
  };

  // Prevent body scroll when modal is open
  const body = document.querySelector("body");
  modal ? (body.style.overflow = "hidden") : (body.style.overflow = "auto");

  return (
    <Card
      className={getClasses()}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {noImages ? (
        <div className={`${prefix}__image ${prefix}__image--no-image`}>
          No image
        </div>
      ) : (
        <>
          <ImageCarousel onClickItem={() => setModal(true)}>
            {images.map((image) => (
              <img
                className={`${prefix}__images__image`}
                key={image.id}
                src={image.file}
                alt={image.name}
              />
            ))}
          </ImageCarousel>
          {modal ? (
            <ImageCarouselModal
              images={images}
              onClose={() => setModal(false)}
            />
          ) : null}
        </>
      )}
    </Card>
  );
};
