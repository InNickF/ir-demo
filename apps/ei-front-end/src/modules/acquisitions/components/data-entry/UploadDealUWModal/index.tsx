import { required } from "@/commons/utils/input-validations";
import { uploadDealUnderwritingModelToS3 } from "@/acquisitions/services/api/deals";
import { useMutateDealUnderwritingModel } from "@/acquisitions/services/mutations/deals";
import { Deal } from "@/acquisitions/typings/deals";
import { Button, Modal } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  GenericControlledDropzone,
  GenericControlledDropzoneProps,
} from "@/commons/components/data-entry/GenericControlledDropzone";

interface UnderwritingModelFile {
  file: File;
}
export interface UploadDealUWModalProps {
  modal: boolean;
  dealId: Deal["id"];
  dealType: Deal["type"];
  onAction: () => void;
}

export const UploadDealUWModal: FC<UploadDealUWModalProps> = ({
  modal,
  dealId,
  dealType,
  onAction,
}) => {
  const router = useRouter();
  const { dealId: routerDealId } = router.query as { dealId: string };

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UnderwritingModelFile>();

  const [loading, setLoading] = useState(false);
  const mutateUWModel = useMutateDealUnderwritingModel();

  type Dropzones = {
    Component: typeof GenericControlledDropzone;
    key: string;
    props: GenericControlledDropzoneProps<UnderwritingModelFile>;
  };

  const inputs: Array<Dropzones> = [
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
        options: {
          accept: { "application/vnd.ms-excel": [".xlsb"] },
        },
        onChange: (uwModel: File[]) => {
          setValue("file", uwModel[0]);
        },
      },
    },
  ];

  const uploadNewUW = ({ file }: { file: File }) => {
    setLoading(true);
    uploadDealUnderwritingModelToS3({
      dealId: dealId || routerDealId,
      model: file,
      dealType: dealType?.value,
    }).then((data) => {
      mutateUWModel.mutate(data, {
        onSettled: () => {
          setLoading(false);
          onAction();
          reset();
        },
      });
    });
  };

  return (
    <Modal
      disclosure={<span className="hidden"></span>}
      modal={modal}
      visible={modal}
    >
      {() => (
        <form onSubmit={handleSubmit(uploadNewUW)}>
          <Modal.Header
            onClose={() => {
              onAction();
              reset();
            }}
          >
            Upload new underwriting model
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
                onAction();
                reset();
              }}
            >
              Close
            </Button>
            <Button block loading={loading} disabled type="submit">
              Upload
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
