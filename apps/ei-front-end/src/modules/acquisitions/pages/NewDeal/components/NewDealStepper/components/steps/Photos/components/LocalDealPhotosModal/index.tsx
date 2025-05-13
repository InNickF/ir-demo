import {
  GenericControlledDropzone,
  GenericControlledDropzoneProps,
} from "@/commons/components/data-entry/GenericControlledDropzone";
import { required } from "@/commons/utils/input-validations";
import { Button, Input, InputProps, Modal } from "in-ui-react";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";

export type PhotosFormData = {
  file: File;
};
interface LocalDealPhotosModalProps {
  isLoading?: boolean;
  onSave?: (photo: PhotosFormData) => void;
}

export const LocalDealPhotosModal: FC<LocalDealPhotosModalProps> = ({
  isLoading = false,
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
  } = useForm<PhotosFormData>();

  const renameFileName = (file: File, name: string) => {
    const nameWithExtension =
      name + file.name.slice(file.name.lastIndexOf("."));
    return new File([file], nameWithExtension, { type: file.type });
  };

  const fileName = watch("file")
    ? watch("file").name.replace(/\.[^/.]+$/, "")
    : "";

  type Inputs = {
    Component: typeof Input;
    key: string;
    props: InputProps;
  };

  type Dropzones = {
    Component: typeof GenericControlledDropzone;
    key: string;
    props: GenericControlledDropzoneProps<PhotosFormData>;
  };

  const inputs: Array<Inputs | Dropzones> = [
    {
      Component: GenericControlledDropzone,
      key: "file",
      props: {
        control,
        identifier: "file",
        onRemove: () => setValue("file", null),
        showTags: true,
        rules: {
          required: required("A file"),
        },
        error: errors?.file?.message,
        options: { accept: { "image/jpeg": [".jpeg", ".png"] } },
        onChange: (photo: File[]) => {
          setValue("file", photo[0]);
        },
      },
    },
    {
      Component: Input,
      key: "name",
      props: {
        label: "Name",
        value: fileName,
        disabled: !fileName,
        placeholder: "Select a file first to modify its name.",
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          setValue("file", renameFileName(getValues("file"), e.target.value)),
      },
    },
  ];

  return (
    <Modal disclosure={<Button className="mb-6">Upload new photo</Button>}>
      {(dialog) => (
        <form
          onSubmit={handleSubmit((data) => {
            onSave?.(data);
            dialog.hide();
            reset();
          })}
        >
          <Modal.Header
            onClose={() => {
              dialog.hide();
            }}
          >
            Upload new photo
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-5">
              {inputs.map((input) => {
                const { Component, key, props } = input;
                return (
                  <Component
                    key={key}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(props as any)}
                    error={errors?.[key]?.message}
                  />
                );
              })}
            </div>
          </Modal.Body>
          <div className="flex">
            <Button
              block
              kind="ghost"
              onClick={() => {
                dialog.hide();
                reset();
              }}
            >
              Close
            </Button>
            <Button block type="submit" disabled loading={isLoading}>
              Save
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
