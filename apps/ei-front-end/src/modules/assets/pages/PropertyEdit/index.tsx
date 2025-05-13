import { AssetHead } from "@/assets/components/general/AssetHead";
import { AssetLayout } from "@/assets/layouts/AssetLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import {
  UploadPhotoModal,
  UploadPhotoModalReturnType,
} from "@/commons/components/general/UploadPhotoModal";
import { NextPageWithLayout } from "@/commons/typings";
import { ButtonGroup } from "in-ui-react";
import { ReactElement, useState } from "react";
import { usePropertyIdFromQueryParams } from "../../hooks/usePropertyIdFromQueryParams";
import { uploadPropertyPhotoToS3 } from "../../services/api/properties";
import { useMutatePostPropertyAttachments } from "../../services/mutations/properties";
import { EditPropertyBenchmark } from "./components/EditPropertyBenchmark";
import { EditPropertyCriticalDates } from "./components/EditPropertyCriticalDates";
import { EditPropertyInformation } from "./components/EditPropertyInformation";
import { EditPropertyPhotos } from "./components/EditPropertyPhotos";
import { useButtonGroupPropertyEdit } from "./hooks/useButtonGroupPropertyEdit";
import "./styles.css";

const PropertyEdit: NextPageWithLayout = () => {
  const prefix = "assets-property-edit";

  const {
    propertyEditFilter,
    propertyEditFilterItems,
    propertyEditInformationClasses,
    propertyEditCriticalDatesClasses,
    propertyEditPhotosClasses,
    propertyEditBenchmarkClasses,
  } = useButtonGroupPropertyEdit();

  const propertyId = usePropertyIdFromQueryParams();

  const postMutation = useMutatePostPropertyAttachments();

  const [isUploading, setIsUploading] = useState(false);

  const createPhoto = ({
    photo,
    dialog,
    reset,
  }: UploadPhotoModalReturnType) => {
    setIsUploading(true);
    uploadPropertyPhotoToS3({
      property_under_management_code: propertyId,
      photo: photo.file,
    }).then((data) => {
      postMutation.mutate(data, {
        onSettled: () => {
          setIsUploading(false);
          dialog.hide();
          reset();
        },
      });
    });
  };

  return (
    <section className={prefix}>
      <div className={`${prefix}__button-group-wrapper`}>
        <ButtonGroup
          active={propertyEditFilter}
          items={propertyEditFilterItems}
          className={`${prefix}__button-group`}
        />
        <UploadPhotoModal
          className={propertyEditPhotosClasses}
          isUploading={isUploading}
          onSave={(args) => createPhoto({ ...args })}
        />
      </div>
      <div>
        <EditPropertyInformation className={propertyEditInformationClasses} />
        <EditPropertyCriticalDates
          className={propertyEditCriticalDatesClasses}
        />
        <EditPropertyBenchmark className={propertyEditBenchmarkClasses} />
        <EditPropertyPhotos className={propertyEditPhotosClasses} />
      </div>
    </section>
  );
};

PropertyEdit.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Property - Edit" />
      <AssetLayout>{page}</AssetLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PropertyEdit;
