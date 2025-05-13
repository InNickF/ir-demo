import { MapPinIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { Marker, MarkerProps } from "react-map-gl";
import "./styles.css";

/**
 *
 * @see {@link https://visgl.github.io/react-map-gl/docs/api-reference/marker} for official documentation.
 */
export const GenericMarker: FC<MarkerProps> = ({ children, ...props }) => {
  return (
    <Marker
      {...props}
      style={{
        zIndex: 5,
      }}
    >
      {children || <MapPinIcon className="ei-generic-marker" />}
    </Marker>
  );
};
