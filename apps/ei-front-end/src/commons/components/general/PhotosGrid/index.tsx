import { PhotoIcon } from "@heroicons/react/24/outline";
import { Empty, LoadingLine, Skeleton } from "in-ui-react";
import { FC, useState } from "react";
import { PhotoCard } from "./components/PhotoCard";
import { AttachmentsCommonKeys } from "@/commons/typings";
import { ImageCarouselModal } from "../ImageCarouselModal";
import "./styles.css";
interface PhotosGridProps {
  photos: AttachmentsCommonKeys[];
  noPhotosMessage?: string;
  isDeleting?: boolean;
  isLoading?: boolean;
  isRefetching?: boolean;
  onDeletePhoto: (photo: AttachmentsCommonKeys) => void;
}

export const PhotosGrid: FC<PhotosGridProps> = ({
  photos = [],
  noPhotosMessage = "There is no any uploaded photo yet.",
  isDeleting = false,
  isRefetching = false,
  isLoading = false,
  onDeletePhoto,
}) => {
  const prefix = "commons-photos-grid";

  const [modal, setModal] = useState(false);
  const [clickedPhotoId, setClickedPhotoId] = useState("");

  // Prevent body scroll when modal is open
  const body = document.querySelector("body");
  modal ? (body.style.overflow = "hidden") : (body.style.overflow = "auto");

  const initialIndex = photos.findIndex((image) => image.id === clickedPhotoId);

  const sortedImages =
    initialIndex > 0
      ? [...photos.slice(initialIndex), ...photos.slice(0, initialIndex)]
      : photos;

  const SkeletonComponent = () => (
    <Skeleton className={`${prefix}__skeleton-wrapper`}>
      <Skeleton.Avatar shape="squared" className={`${prefix}__skeleton-item`} />
    </Skeleton>
  );

  const PhotosComponent = () => {
    return photos.length > 0 ? (
      <div className={`${prefix}__container commons-default-form-grid`}>
        {photos.map((photo) => (
          <PhotoCard
            key={photo?.key}
            photo={photo}
            isDeleting={isDeleting && clickedPhotoId === photo?.id}
            onDelete={() => {
              setClickedPhotoId(photo?.id);
              onDeletePhoto(photo);
            }}
            onPhotoClick={() => {
              setClickedPhotoId(photo?.id);
              setModal(true);
            }}
          />
        ))}
      </div>
    ) : (
      <Empty
        className={`${prefix}__empty`}
        icon={<PhotoIcon />}
        description={<p>{noPhotosMessage}</p>}
      />
    );
  };

  return (
    <>
      <LoadingLine persist isActive={isRefetching} />
      {isLoading ? <SkeletonComponent /> : <PhotosComponent />}
      {modal && (
        <ImageCarouselModal
          images={sortedImages}
          onClose={() => {
            setModal(false);
          }}
        />
      )}
    </>
  );
};
