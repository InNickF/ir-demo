import { useEscapeKey } from "@/commons/hooks/useScapeKey";
import { AttachmentsCommonKeys } from "@/commons/typings";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Overlay } from "in-ui-react";
import { FC } from "react";
import { ImageCarousel } from "../../data-display/ImageCarousel";
import "./styles.css";

interface ImageCarouselModalProps {
  onClose: () => void;
  images: AttachmentsCommonKeys[];
}

export const ImageCarouselModal: FC<ImageCarouselModalProps> = ({
  onClose,
  images,
}) => {
  const prefix = "commons-image-carousel-modal";

  useEscapeKey({ action: onClose });

  return (
    <Overlay className={prefix}>
      <div className="h-full p-4">
        <div className="flex justify-end mb-4">
          <Button
            kind="outline"
            onClick={onClose}
            onlyIcon
            icon={<XMarkIcon />}
          ></Button>
        </div>
        <ImageCarousel showThumbs onClickItem={() => null}>
          {images.map((image) => (
            <img
              className={`${prefix}__image`}
              key={image.id}
              src={image.file}
              alt={image.name}
            />
          ))}
        </ImageCarousel>
      </div>
    </Overlay>
  );
};
