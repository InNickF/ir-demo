import { getIndustrialGeographiesByLatitudeAndLongitude } from "../services/api/market-analytics";

export const validateLatLngHasValidMarket = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<boolean> => {
  if (!latitude || !longitude) {
    return false;
  }
  const markets = await getIndustrialGeographiesByLatitudeAndLongitude({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    type: "Market",
  });

  return markets?.results?.length > 0;
};
