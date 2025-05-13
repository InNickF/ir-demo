import { MarkerCustomProps } from "@/commons/typings";
import { FC } from "react";
import { Popup as PopupGL, PopupProps } from "react-map-gl";
import "./styles.css";

export interface PopupIProps {
  selectedMarker?: MarkerCustomProps;
  onClosePopup?: () => void;
}

export const PopUp: FC<PopupProps & PopupIProps> = ({
  selectedMarker,
  onClosePopup,
  ...props
}) => {
  return selectedMarker ? (
    <PopupGL
      className="map-box-popup-custom"
      {...props}
      onClose={onClosePopup}
      closeOnClick={false}
    >
      {selectedMarker?.customPopup ? selectedMarker?.customPopup : null}
    </PopupGL>
  ) : null;
};
