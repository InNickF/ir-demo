import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { required } from "@/commons/utils/input-validations";
import { Button } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { GenericControlledSelect } from "@/commons/components/data-entry/GenericControlledSelect";
import { useAssetsPropertiesFilters } from "@/modules/tools/services/queries/filters";
import { UploadLoanAbstractPayload } from "@/modules/tools/typings/tools";
import "@/tools/styles/index.css";

interface UploadLoanAbstractFormProps {
  onSubmit?: (data: UploadLoanAbstractPayload) => void;
  className?: string;
  isLoading?: boolean;
}

export const UploadLoanAbstractForm: FC<UploadLoanAbstractFormProps> = ({
  className,
  onSubmit,
  isLoading,
}) => {
  const prefix = "tools-basic-form";

  const { data: properties, isLoading: isLoadingProperties } =
    useAssetsPropertiesFilters();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UploadLoanAbstractPayload>();

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <form
      className={getClasses()}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <GenericControlledSelect
        control={control}
        label="Property"
        identifier="scode"
        loading={isLoadingProperties}
        options={properties?.options || []}
        placeholder="Select a Property"
        error={errors.scode?.message as string}
        rules={{ required: required("Property") }}
        onChange={({ value }) => {
          setValue("scode", value);
        }}
      />
      <GenericControlledDropzone
        control={control}
        identifier="file"
        onRemove={() => setValue("file", null)}
        showTags
        options={{
          accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [".xlsx"],
          },
        }}
        error={errors.file?.message as string}
        rules={{ required: required("File") }}
        onChange={(file: File[]) => {
          setValue("file", file[0]);
        }}
      />
      <Button
        block
        type="submit"
        className={`${prefix}__button-action`}
        loading={isLoading}
        disabled
      >
        Upload File
      </Button>
    </form>
  );
};
