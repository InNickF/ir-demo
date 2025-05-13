import { useMutateDeleteDealPhoto } from "@/acquisitions/services/mutations/deals";
import { useDealPhotos } from "@/acquisitions/services/queries/deals";
import { DealImage } from "@/acquisitions/typings/deals";
import { PhotosGrid } from "@/commons/components/general/PhotosGrid";
import { useRouter } from "next/router";
import { FC } from "react";

interface DealPhotosProps {
  className?: string;
}

export const DealPhotos: FC<DealPhotosProps> = ({ className }) => {
  const router = useRouter();
  const { dealId } = router.query as { dealId: string };

  const deletePhotoMutation = useMutateDeleteDealPhoto();

  const { data: dealPhotos, isLoading } = useDealPhotos(dealId as string);

  const deleteDealPhoto = (photo: DealImage) => {
    deletePhotoMutation.mutate(photo);
  };

  return (
    <section className={className}>
      <PhotosGrid
        photos={dealPhotos?.results}
        isDeleting={deletePhotoMutation?.isLoading}
        isLoading={isLoading}
        onDeletePhoto={(photo) => deleteDealPhoto(photo)}
      />
    </section>
  );
};
