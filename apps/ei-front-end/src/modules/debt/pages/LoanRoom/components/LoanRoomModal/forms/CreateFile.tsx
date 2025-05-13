import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import {
  uploadLoanRoomAbstractFileToS3,
  uploadLoanRoomItemToS3,
} from "@/modules/debt/services/api/loans";
import {
  DebtLoanRoomItemPayload,
  DebtLocalLoanRoomItem,
} from "@/modules/debt/typings/loans";
import { Button, Input, Modal } from "in-ui-react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { LoanRoomAttachmentTypesSelect } from "../components/LoanRoomAttachmentTypesSelect";
import "../styles.css";
import { LoanRoomFormProps } from "../types";
import { LOAN_FILE_TYPES } from "@/modules/debt/utils";

export const CreateFileForm: FC<LoanRoomFormProps> = ({
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
  } = useForm<DebtLocalLoanRoomItem>();

  const router = useRouter();
  const { loanId } = router.query;

  const [isLoadingFile, setIsLoadingFile] = useState(false);

  const mutation = useMutation<DebtLoanRoomItemPayload>();

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

  const createLoanRoomItem = async (item: DebtLocalLoanRoomItem) => {
    const s3Uploader =
      item.type?.value === LOAN_FILE_TYPES.LOAN_ABSTRACT_EXCEL_FILE
        ? uploadLoanRoomAbstractFileToS3
        : uploadLoanRoomItemToS3;

    setIsLoadingFile(true);
    await s3Uploader({
      loan_abstract_id: loanId as string,
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
      className="debt-add-new-file__modal-form"
      onSubmit={handleSubmit(createLoanRoomItem)}
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
          <LoanRoomAttachmentTypesSelect
            identifier="type"
            label="Attachment Type"
            control={control}
            rules={{ required: required("Types") }}
            onChange={(options: GenericLabelValueObject) => {
              setValue("type", options);
            }}
            error={errors?.type?.message}
          />
        </div>
      </Modal.Body>
      <footer className="debt-loan-room-form-footer">
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
