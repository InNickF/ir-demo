import { PhotoIcon } from "@heroicons/react/24/outline";
import { Empty } from "in-ui-react";
import { FC } from "react";
import { LocalDealPhotosCard } from "../LocalDealPhotosCard";

type LocalDealPhotosGridProps =
  | {
      photos: File[];
      removable: boolean;
      removeLocalPhoto: (file: File) => void;
      noPhotosMessage?: string;
    }
  | {
      photos: File[];
      removable?: never;
      removeLocalPhoto?: never;
      noPhotosMessage?: string;
    };

export const LocalDealPhotosGrid: FC<LocalDealPhotosGridProps> = ({
  photos = [],
  removeLocalPhoto,
  removable = false,
  noPhotosMessage = "There is no any photo to upload yet.",
}) => {
  return (
    <>
      {photos.length > 0 ? (
        <div className="gap-4 acq-default-form-grid">
          {photos.map((file) => {
            return (
              <LocalDealPhotosCard
                key={file.size}
                file={file}
                removable={removable}
                onRemove={(file) => removeLocalPhoto(file as File)}
              />
            );
          })}
        </div>
      ) : (
        <Empty
          className="mx-auto my-4"
          icon={<PhotoIcon />}
          description={<p>{noPhotosMessage}</p>}
        />
      )}
    </>
  );
};
