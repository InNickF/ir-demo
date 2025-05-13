import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { GenericControlledSelect } from "@/commons/components/data-entry/GenericControlledSelect";
import { GenericLabelValueObject } from "@/commons/typings";
import { getYearsList, yearQuarters } from "@/commons/utils/dates";
import { required } from "@/commons/utils/input-validations";
import { useAssetsFilters } from "@/modules/assets/services/queries/filters";
import { UploadDataFromExcelPayload } from "@/modules/tools/typings/tools";
import "@/tools/styles/index.css";
import { Button, ButtonGroup } from "in-ui-react";
import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useFileTypeFilter } from "./hooks/useFileTypeButtonGroup";

interface UploadDataFormProps {
  onSubmit?: (data: UploadDataFromExcelPayload) => void;
  className?: string;
  isLoading?: boolean;
}

export const UploadDataForm: FC<UploadDataFormProps> = ({
  className,
  onSubmit,
  isLoading,
}) => {
  const prefix = "tools-basic-form";

  const { fileType, fileTypeItems } = useFileTypeFilter();

  const { data: propertyFilters, isLoading: isLoadingPropertyFilters } =
    useAssetsFilters();
  const funds = useMemo(() => {
    return (
      propertyFilters?.find((filter) => filter?.key === "fund")?.options || []
    );
  }, [propertyFilters]);

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<UploadDataFromExcelPayload>({
    defaultValues: {
      fileType: fileType,
    },
  });

  useEffect(() => {
    reset();
    setValue("fileType", fileType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileType]);

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const selectableYears = getYearsList({
    from: 1985,
    to: "today",
  });

  const CashFlowExtraFields = () => {
    return (
      <>
        <div className={`${prefix}__extra-fields`}>
          <GenericControlledSelect
            control={control}
            label="Quarter"
            identifier="quarter"
            loading={isLoadingPropertyFilters}
            options={yearQuarters}
            placeholder="Select a quarter."
            error={errors.quarter?.message as string}
            rules={{ required: required("Quarter") }}
            onChange={(quarter) => {
              setValue("quarter", quarter as GenericLabelValueObject);
            }}
          />
          <GenericControlledSelect
            control={control}
            label="Year"
            identifier="year"
            options={selectableYears}
            placeholder="Select a year."
            error={errors.year?.message as string}
            rules={{ required: required("Year") }}
            onChange={(year) => {
              setValue("year", year as GenericLabelValueObject);
            }}
          />
        </div>
        <GenericControlledSelect
          control={control}
          label="Fund"
          identifier="fund"
          options={funds}
          placeholder="Select a fund."
          error={errors.fund?.message as string}
          rules={{ required: required("Fund") }}
          onChange={(fund: GenericLabelValueObject) => {
            setValue("fund", fund);
          }}
        />
      </>
    );
  };

  return (
    <form
      className={getClasses()}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <ButtonGroup
        className={`${prefix}__button-group`}
        active={fileType}
        items={fileTypeItems}
      />
      {fileType === "CashFlow" ? <CashFlowExtraFields /> : null}
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
      >
        Upload File
      </Button>
    </form>
  );
};
