import { ImageCarousel } from "@/commons/components/data-display/ImageCarousel";
import { useEscapeKey } from "@/commons/hooks/useScapeKey";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Overlay } from "in-ui-react";
import { FC } from "react";

interface ImageCarouselModalProps {
  onClose: () => void;
  images: string[];
  prefix?: string;
}

export const ImageCarouselModal: FC<ImageCarouselModalProps> = ({
  onClose,
  images,
  prefix = "asset-deal-map-and-image",
}) => {
  useEscapeKey({ action: onClose });

  return (
    <Overlay className="asset-image-carousel-modal">
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
          {images.map((image, index) => (
            <img
              className={`${prefix}__images__image`}
              key={index}
              src={image}
              alt={image}
            />
          ))}
        </ImageCarousel>
      </div>
    </Overlay>
  );
};
