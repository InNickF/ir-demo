import { ImageCarousel } from "@/commons/components/data-display/ImageCarousel";
import { Card } from "in-ui-react";
import { AssetMapInteractions } from "./AssetMap";
import { FC, useState } from "react";
import { ImageCarouselModal } from "./ImageCarouselModal";

interface AssetImageProps extends AssetMapInteractions {
  images: string[];
  prefix?: string;
}

export const AssetImages: FC<AssetImageProps> = ({
  images,
  onEnter,
  onLeave,
  prefix = "asset-deal-map-and-image",
}) => {
  const [modal, setModal] = useState(false);

  const noImages = !images?.length;

  const getClasses = () => {
    const classes = [`${prefix}__images`];
    return classes.join(" ");
  };

  // Prevent body scroll when modal is open
  const body = document.querySelector("body");
  modal ? (body.style.overflow = "hidden") : (body.style.overflow = "auto");

  return (
    <Card
      className={getClasses()}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {noImages ? (
        <div className={`${prefix}__image ${prefix}__image--no-image`}>
          No image
        </div>
      ) : (
        <>
          <ImageCarousel onClickItem={() => setModal(true)}>
            {images.map((image, index) => (
              <img
                className={`${prefix}__images__image`}
                key={index}
                src={image}
                alt={image}
              />
            ))}
          </ImageCarousel>
          {modal ? (
            <ImageCarouselModal
              images={images}
              onClose={() => setModal(false)}
            />
          ) : null}
        </>
      )}
    </Card>
  );
};
