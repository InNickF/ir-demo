import { DealGeoLocation } from "@/acquisitions/typings/deals";
import { Map } from "@/commons/components/maps/Map";
import { MarkerCustomProps } from "@/commons/typings";
import { getSatelliteStreetStyleURI } from "@/commons/utils/maps";
import { FC } from "react";
import { CustomDealPopup } from "./CustomDealPopup";

const getMarkerData = (data: DealGeoLocation[]): MarkerCustomProps[] => {
  if (data?.length > 0) {
    return data?.map((item) => ({
      latitude: Number(item?.latitude),
      longitude: Number(item?.longitude),
      color: "rgba(19, 52, 99,1)",
      customPopup: <CustomDealPopup key={item?.id} deal={item} />,
    }));
  }
};

export const DealsGeographyMap: FC<{ data: DealGeoLocation[] }> = ({
  data,
}) => {
  const markers = getMarkerData(data);
  return (
    <div className="h-full min-h-[350px] generic-entrance-animation ">
      <Map defaultStyle={getSatelliteStreetStyleURI()} markers={markers} />
    </div>
  );
};
