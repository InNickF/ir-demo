import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Card, Heading, Tooltip } from "in-ui-react";
import { FC } from "react";
import "./styles.css";
import { AttachmentsCommonKeys } from "@/commons/typings";
import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";

interface PhotoCardProps {
  photo: AttachmentsCommonKeys;
  isDeleting?: boolean;
  onDelete: () => void;
  onPhotoClick: () => void;
}

export const PhotoCard: FC<PhotoCardProps> = ({
  photo,
  isDeleting = false,
  onDelete,
  onPhotoClick,
}) => {
  const prefix = "commons-photo-card";

  const headerMaxLength = 20;

  return (
    <Card className={prefix}>
      <div className={`${prefix}__header`}>
        <Tooltip
          content={photo.name}
          hidden={photo.name.length < headerMaxLength}
        >
          <Heading kind="h5">
            {slicedTextWithEllipsis({
              text: photo.name,
              maxLength: headerMaxLength,
            })}
          </Heading>
        </Tooltip>

        <Tooltip content="Delete Photo">
          <Button
            onlyIcon
            size="small"
            icon={<XMarkIcon />}
            kind="ghost"
            loading={isDeleting}
            disabled
          />
        </Tooltip>
      </div>
      <div className={`${prefix}__body`}>
        <img
          className={`${prefix}__image`}
          src={photo?.file}
          alt={photo?.name}
          onClick={() => onPhotoClick()}
        />
      </div>
    </Card>
  );
};
