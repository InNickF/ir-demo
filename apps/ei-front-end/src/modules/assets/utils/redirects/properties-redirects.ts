const propertySections = [
  "details",
  "operational-financial-performance",
  "tenants",
  "edit",
  "debt",
  "investing-performance",
  "market-analytics",
] as const;

interface GetPropertyDetailsURL {
  propertyId: string;
  section?: typeof propertySections[number];
}
export const getPropertyURL = ({
  propertyId,
  section = "details",
}: GetPropertyDetailsURL): string => {
  const urls: Record<typeof propertySections[number], string> = {
    details: "/assets/properties/property-details/",
    "operational-financial-performance":
      "/assets/properties/property-details/operational-financial-performance/",
    tenants: "/assets/properties/property-details/tenants/",
    edit: "/assets/properties/property-details/edit/",
    debt: "/assets/properties/property-details/debt/",
    "investing-performance":
      "/assets/properties/property-details/investing-performance/",
    "market-analytics": "/assets/properties/property-details/market-analytics/",
  };

  return `${urls[section] || urls["details"]}?propertyId=${propertyId}`;
};

export const getPropertiesURL = (): string => "/assets/properties";
