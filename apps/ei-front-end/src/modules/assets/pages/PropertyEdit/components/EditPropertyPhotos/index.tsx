import { PhotosGrid } from "@/commons/components/general/PhotosGrid";
import { usePropertyIdFromQueryParams } from "@/modules/assets/hooks/usePropertyIdFromQueryParams";
import { useMutateDeletePropertyAttachment } from "@/modules/assets/services/mutations/properties";
import { useGetPropertyAttachments } from "@/modules/assets/services/queries/properties";
import { PropertyAttachments } from "@/modules/assets/typings/property";
import { FC } from "react";

interface EditPropertyPhotosProps {
  className?: string;
}

export const EditPropertyPhotos: FC<EditPropertyPhotosProps> = ({
  className,
}) => {
  const propertyId = usePropertyIdFromQueryParams();

  const deletePhotoMutation = useMutateDeletePropertyAttachment();

  const { data, isLoading, isRefetching } = useGetPropertyAttachments({
    filters: {
      property_under_management_code: propertyId,
      type: "PROPERTY_PICTURE",
    },
  });

  const deletePropertyPhoto = (photo: PropertyAttachments) => {
    deletePhotoMutation.mutate(photo);
  };

  return (
    <section className={className}>
      <PhotosGrid
        photos={data?.results}
        isDeleting={deletePhotoMutation?.isLoading}
        isLoading={isLoading}
        isRefetching={isRefetching}
        onDeletePhoto={(photo: PropertyAttachments) =>
          deletePropertyPhoto(photo)
        }
      />
    </section>
  );
};
