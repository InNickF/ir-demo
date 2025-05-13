import { FC, PropsWithChildren, ReactChild } from "react";
import { Button, Tooltip } from "in-ui-react";
import { Carousel } from "react-responsive-carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "./styles.css";

interface ImageCarouselProps extends PropsWithChildren {
  className?: string;
  onClickItem?: (index: number, item: React.ReactNode) => void;
  showThumbs?: boolean;
}

const prefix = "ei-image-carousel";
export const ImageCarousel: FC<ImageCarouselProps> = ({
  children,
  className,
  onClickItem,
  showThumbs = false,
}) => {
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Carousel
      onClickItem={(index, item) => onClickItem(index, item)}
      className={getClasses()}
      emulateTouch
      showIndicators={false}
      showThumbs={showThumbs}
      showStatus={false}
      infiniteLoop
      renderArrowPrev={(onClickHandler) => {
        return (
          <div
            className={`${prefix}__button-container ${prefix}__button-container--prev`}
          >
            <Tooltip content="Previous Image">
              <Button
                icon={<ChevronLeftIcon />}
                onlyIcon
                onClick={() => {
                  onClickHandler();
                }}
              />
            </Tooltip>
          </div>
        );
      }}
      renderArrowNext={(onClickHandler) => {
        return (
          <div
            className={`${prefix}__button-container ${prefix}__button-container--next`}
          >
            <Tooltip content="Next Image">
              <Button
                icon={<ChevronRightIcon />}
                onlyIcon
                onClick={() => {
                  onClickHandler();
                }}
              />
            </Tooltip>
          </div>
        );
      }}
    >
      {children as ReactChild[]}
    </Carousel>
  );
};
