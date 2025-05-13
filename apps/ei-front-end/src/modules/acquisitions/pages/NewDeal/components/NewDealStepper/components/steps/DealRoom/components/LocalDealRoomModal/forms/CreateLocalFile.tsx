import { LocalDealRoomItem } from "@/acquisitions/typings/deals";
import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { createUUID } from "@/commons/utils/uuid";
import { Button, Input, Modal, TextArea } from "in-ui-react";
import { ChangeEvent, FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { LocalDealRoomFormProps } from "../types";
import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { GenericControlledSelect } from "@/commons/components/data-entry/GenericControlledSelect";

export const CreateLocalFileForm: FC<LocalDealRoomFormProps> = ({
  item,
  labels,
  onAction,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<LocalDealRoomItem>({
    defaultValues: { ...item },
  });

  getValues("tempId") || setValue("tempId", createUUID());

  const fileWatch = useWatch({
    control,
    name: "file",
  });

  const fileNameWithoutExtension =
    getValues("file") && getValues("file").name.replace(/\.[^/.]+$/, "");

  const renameFileName = (file: File, name: string) => {
    const fileExtension = file.name.slice(file.name.lastIndexOf("."));
    const nameWithExtension = `${name}${fileExtension}`;
    return new File([file], nameWithExtension, { type: file.type });
  };

  fileWatch && setValue("name", fileNameWithoutExtension);

  return (
    <form
      className="acq-create-local-file__form"
      onSubmit={handleSubmit((data) => {
        onAction(data);
      })}
    >
      <Modal.Body>
        <div>
          <GenericControlledDropzone
            control={control}
            identifier="file"
            onRemove={() => setValue("file", null)}
            showTags
            rules={{ required: required("A file") }}
            error={errors?.file?.message as string}
            onChange={(e) => setValue("file", e[0])}
          />
        </div>
        <Input
          label="Name"
          disabled={!getValues("name")}
          placeholder="Select a file first to modify its name"
          {...register("name", {
            required: required("Name"),
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setValue(
                "file",
                renameFileName(getValues("file"), e.target.value)
              ),
          })}
        />
        <GenericControlledSelect
          identifier="labels"
          label="Labels"
          options={labels[0]?.options}
          control={control}
          rules={{ required: required("Labels") }}
          error={errors?.labels?.message}
          onChange={(option: GenericLabelValueObject[]) => {
            setValue("labels", option);
          }}
          isMulti
        />
        <TextArea
          label="Notes"
          {...register("notes")}
          error={errors.notes && "This field is required"}
        />
        <Input
          label="TempId"
          type="hidden"
          className="hidden"
          {...register("tempId")}
        />
      </Modal.Body>
      <div className="flex">
        <Button
          block
          kind="ghost"
          onClick={() => {
            onCancel();
          }}
        >
          Close
        </Button>
        <Button block type="submit" disabled>
          Save
        </Button>
      </div>
    </form>
  );
};
