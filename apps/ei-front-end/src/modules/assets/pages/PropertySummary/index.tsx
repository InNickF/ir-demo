import { AssetPropertyImageMap } from "@/assets/components/data-display/PropertyImageMap";
import { PropertyInformation } from "@/assets/components/data-display/PropertyInformation";
import { AssetHead } from "@/assets/components/general/AssetHead";
import { usePropertyIdFromQueryParams } from "@/assets/hooks/usePropertyIdFromQueryParams";
import { AssetLayout } from "@/assets/layouts/AssetLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";
import { AssetPropertyComments } from "./components/AssetPropertyComments";
import { AssetPropertyStrategy } from "./components/AssetPropertyStrategy";
import { AssetPropertyTimeline } from "./components/AssetPropertyTimeline";
import "./styles.css";

const PropertyAsset: NextPageWithLayout = () => {
  const propertyId = usePropertyIdFromQueryParams();

  return (
    <div className="asset-property-page__grid">
      <PropertyInformation
        propertyId={propertyId}
        className="asset-property-page__grid-half"
      />
      <AssetPropertyImageMap
        propertyId={propertyId}
        className="asset-property-page__grid-half"
      />
      <AssetPropertyStrategy
        propertyId={propertyId}
        className="asset-property-page__grid-full"
      />
      <AssetPropertyComments
        propertyId={propertyId}
        className="asset-property-page__grid-full"
      />
      <AssetPropertyTimeline
        propertyId={propertyId}
        className="asset-property-page__grid-half"
      />
    </div>
  );
};

PropertyAsset.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Property Details" />
      <AssetLayout>{page}</AssetLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PropertyAsset;
