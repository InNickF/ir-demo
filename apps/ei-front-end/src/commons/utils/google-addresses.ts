export type AddressComponentsReturnType = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
};

export const POTENTIAL_CITY_FIELDS: Array<string> = [
  "locality",
  "sublocality",
  "administrative_area_level_2",
  "sublocality_level_1",
  "neighborhood",
];

export const extractAddressComponentsFromGooglePlace = (
  place: google.maps.places.PlaceResult
): AddressComponentsReturnType => {
  const { address_components, geometry, formatted_address: address } = place;

  const longitude = geometry.location.lng();
  const latitude = geometry.location.lat();

  const city = address_components?.find((c) =>
    POTENTIAL_CITY_FIELDS.includes(c.types[0])
  )?.long_name;

  const state = address_components?.find((c) =>
    c.types.includes("administrative_area_level_1")
  )?.short_name;

  const zipCode = address_components?.find((c) =>
    c.types.includes("postal_code")
  )?.long_name;

  return {
    address,
    city,
    state,
    zipCode,
    latitude,
    longitude,
  };
};
