import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { required } from "@/commons/utils/input-validations";
import { Button, Input, Modal } from "in-ui-react";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";
import { DialogStateReturn } from "reakit";
import { getFileName, getNewFileRenamed } from "./utils";

export type UploadPhotoModalFormData = {
  file: File;
};

export type UploadPhotoModalReturnType = {
  photo: UploadPhotoModalFormData;
  dialog: DialogStateReturn;
  reset: () => void;
};

interface UploadPhotoModalProps {
  isUploading?: boolean;
  className?: string;
  onSave?: ({ photo, dialog, reset }: UploadPhotoModalReturnType) => void;
}

export const UploadPhotoModal: FC<UploadPhotoModalProps> = ({
  isUploading = false,
  className,
  onSave,
}) => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<UploadPhotoModalFormData>();

  const fileName = getFileName({ file: watch("file") });

  return (
    <Modal disclosure={<Button className={className}>Upload new photo</Button>}>
      {(dialog) => (
        <form
          onSubmit={handleSubmit((photo) => onSave({ photo, dialog, reset }))}
        >
          <Modal.Header
            onClose={() => {
              dialog.hide();
              reset();
            }}
          >
            Upload new photo
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-5">
              <GenericControlledDropzone
                control={control}
                identifier="file"
                onRemove={() => setValue("file", null)}
                showTags={true}
                rules={{
                  required: required("A file"),
                }}
                error={errors?.file?.message}
                options={{ accept: { "image/jpeg": [".jpeg", ".png"] } }}
                onChange={(photo: File[]) => {
                  setValue("file", photo[0]);
                }}
              />
              <Input
                label="Name"
                value={fileName}
                disabled={!fileName}
                placeholder="Select a file first to modify its name."
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue(
                    "file",
                    getNewFileRenamed({
                      file: getValues("file"),
                      newFileName: e.target.value,
                    })
                  )
                }
              />
            </div>
          </Modal.Body>
          <div className="flex">
            <Button
              block
              kind="ghost"
              disabled={isUploading}
              onClick={() => {
                dialog.hide();
                reset();
              }}
            >
              Close
            </Button>
            <Button block type="submit" disabled loading={isUploading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
