import { StepFooter } from "@/acquisitions/pages/NewDeal/components/NewDealStepper/components/StepFooter";
import { LocalDealPhotosGrid } from "@/acquisitions/pages/NewDeal/components/NewDealStepper/components/steps/Photos/components/LocalDealPhotosGrid";
import { Stepper } from "in-ui-react";
import { FC, useState } from "react";
import { GenericStepContentActions } from "../../../types";
import { LocalDealPhotosModal } from "./components/LocalDealPhotosModal";

export const PhotosStep: FC<GenericStepContentActions<File[]>> = ({
  current,
  onBack,
  onContinue,
}) => {
  const [photos, setPhotos] = useState<File[]>([]);

  const removeLocalPhoto = (file: File) => {
    const newPhotos = photos.filter((photo) => photo !== file);
    setPhotos(newPhotos);
  };

  return (
    <Stepper.StepContent step={3} current={current}>
      <LocalDealPhotosModal
        onSave={(photo) => {
          setPhotos([...photos, photo.file]);
        }}
      />
      <LocalDealPhotosGrid
        noPhotosMessage="There is no information to show"
        photos={photos}
        removable={true}
        removeLocalPhoto={removeLocalPhoto}
      />
      <StepFooter
        current={current}
        onBack={onBack}
        onContinue={() => onContinue(photos)}
      />
    </Stepper.StepContent>
  );
};
