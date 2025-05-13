import { useMoveMapBoxMapOnLatLngChange } from "@/commons/hooks/useMoveMapBoxMapOnLatLngChange";
import {
  useProperty,
  useGetPropertyAttachments,
} from "@/modules/assets/services/queries/properties";
import { Card, Empty, Skeleton } from "in-ui-react";
import { FC, HTMLAttributes, useRef } from "react";
import { MapRef } from "react-map-gl";
import { AssetImages } from "./components/AssetImage";
import { AssetMap } from "./components/AssetMap";
import "./styles.css";
interface AssetPropertyImageMapProps extends HTMLAttributes<HTMLDivElement> {
  propertyId: string | string[];
  goToGoogleMaps?: boolean;
}

export const AssetPropertyImageMap: FC<AssetPropertyImageMapProps> = ({
  propertyId,
  className,
  goToGoogleMaps = false,
  ...props
}) => {
  const { data: images, isLoading: isLoadingImages } =
    useGetPropertyAttachments({
      filters: {
        property_under_management_code: propertyId as string,
        type: "PROPERTY_PICTURE",
      },
    });

  const imagesResults = images?.results?.map((image) => image.file);

  const { data: property, isLoading: isLoadingProperty } = useProperty({
    propertyId: propertyId as string,
  });

  const prefix = "asset-deal-map-and-image";
  const noImages = !images?.results?.length;

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    noImages && classes.push(`${prefix}--no-images`);
    return classes.join(" ");
  };
  const mustRender =
    (property?.latitude && property?.longitude) || images?.results?.length;

  const map = useRef<MapRef>(null);

  useMoveMapBoxMapOnLatLngChange({
    mapRef: map,
    longitude: property?.longitude || null,
    latitude: property?.latitude || null,
    speed: 2,
    curve: 1.5,
  });

  const resizeMap = () => {
    setTimeout(() => {
      map.current?.resize();
    }, 350);
  };
  return (
    <div {...props} className={getClasses()}>
      {isLoadingProperty || isLoadingImages ? (
        <Skeleton className="w-[100%!important] h-[500px!important]">
          <Skeleton.Avatar
            shape="squared"
            className="w-[100%!important] h-[500px!important]"
          />
        </Skeleton>
      ) : mustRender ? (
        <>
          <AssetImages
            images={imagesResults}
            onEnter={resizeMap}
            onLeave={resizeMap}
          />
          <AssetMap
            ref={map}
            latitude={property?.latitude}
            longitude={property?.longitude}
            onEnter={resizeMap}
            onLeave={resizeMap}
            goToGoogleMaps={goToGoogleMaps}
          />
        </>
      ) : (
        <Card className="w-[100%!important] h-[500px!important]">
          <Empty />
        </Card>
      )}
    </div>
  );
};
