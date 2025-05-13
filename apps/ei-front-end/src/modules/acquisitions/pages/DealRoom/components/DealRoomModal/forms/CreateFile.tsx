import {
  Deal,
  DealRoomItemPayload,
  LocalDealRoomItem,
} from "@/acquisitions/typings/deals";
import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";

import { uploadDealRoomItemToS3 } from "@/acquisitions/services/api/deals";
import { Button, Input, Modal, TextArea } from "in-ui-react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import "../styles.css";
import { DealRoomFormProps } from "../types";
import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { GenericControlledSelect } from "@/commons/components/data-entry/GenericControlledSelect";

export const CreateFileForm: FC<DealRoomFormProps> = ({
  labels,
  useMutation,
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
  } = useForm<LocalDealRoomItem>();

  const router = useRouter();
  const { dealId } = router.query;

  const [isLoadingFile, setIsLoadingFile] = useState(false);

  const mutation = useMutation<DealRoomItemPayload>();

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

  const createDealRoomItem = async (item: LocalDealRoomItem) => {
    setIsLoadingFile(true);
    await uploadDealRoomItemToS3({
      dealId: dealId as Deal["id"],
      item: item,
    }).then((data) => {
      mutation.mutate(data, {
        onSettled: () => {
          setIsLoadingFile(false);
          onAction(item);
        },
      });
    });
  };

  return (
    <form
      className="acq-add-new-file__modal-form"
      onSubmit={handleSubmit(createDealRoomItem)}
    >
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <GenericControlledDropzone
            control={control}
            identifier="file"
            onRemove={() => setValue("file", null)}
            showTags
            error={errors?.file?.message as string}
            rules={{ required: required("A file") }}
            onChange={(file: File[]) => {
              setValue("file", file[0]);
            }}
          />
          <Input
            label="Name"
            disabled={!getValues("file")}
            placeholder="Select a file first to modify its name"
            {...register("name", {
              required: required("Name"),
              validate: (value) =>
                value.length > 255
                  ? "Name cannot be longer than 255 characters"
                  : true,
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                setValue(
                  "file",
                  renameFileName(getValues("file"), e.target.value)
                ),
            })}
            error={errors?.name?.message}
          />
          <GenericControlledSelect
            identifier="labels"
            label="Labels"
            options={labels[0]?.options}
            control={control}
            rules={{ required: required("Labels") }}
            isMulti
            onChange={(options: GenericLabelValueObject[]) => {
              setValue("labels", options);
            }}
            error={errors?.labels?.message}
          />
          <TextArea
            label="Notes"
            placeholder="Add notes"
            {...register("notes")}
          />
        </div>
      </Modal.Body>
      <footer className="acq-deal-room-form-footer">
        <Button
          block
          kind="ghost"
          disabled={isLoadingFile}
          onClick={() => {
            onCancel();
          }}
        >
          Close
        </Button>
        <Button block type="submit" disabled loading={isLoadingFile}>
          Save
        </Button>
      </footer>
    </form>
  );
};
