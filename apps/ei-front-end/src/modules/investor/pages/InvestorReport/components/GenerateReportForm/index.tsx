import { Button } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { InvestorSelect } from "./components/InvestorSelect";
import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { AsOfMonthDatePicker } from "./components/AsOfMonthDatepicker";

import "./styles.css";
import { InvestmentSelect } from "./components/InvestmentSelect";
import { MultipleFilesSelect } from "./components/MultipleFilesSelect";

type multipleFilesOptions = "yes" | "no";

interface GenerateReportFormValues {
  investor: GenericLabelValueObject[];
  investment: GenericLabelValueObject[];
  asOfMonth: string;
  multipleFiles: multipleFilesOptions;
}

interface GenerateReportFormProps {
  onSubmit?: (data: GenerateReportFormValues) => void;
  className?: string;
  isLoading: boolean;
}

export const GenerateReportForm: FC<GenerateReportFormProps> = ({
  className,
  onSubmit,
  isLoading,
}) => {
  const prefix = "generate-report-form";

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<GenerateReportFormValues>({
    defaultValues: {
      multipleFiles: "yes",
    },
  });

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
      <InvestorSelect
        label="Investor"
        identifier="investor"
        control={control}
        onChange={(option: GenericLabelValueObject[]) => {
          setValue("investor", option);
          if (errors.investor?.message) {
            setError("investor", { message: "" });
          }
        }}
        error={errors?.investor?.message}
        rules={{
          required: required("Investor"),
        }}
      />
      <InvestmentSelect
        label="Investment"
        identifier="investment"
        control={control}
        onChange={(option: GenericLabelValueObject[]) => {
          setValue("investment", option);
          if (errors.investment?.message) {
            setError("investment", { message: "" });
          }
        }}
        disabled={!watch("investor")}
        error={errors?.investment?.message}
        rules={{
          required: required("Investment"),
        }}
        investors={watch("investor")}
      />
      <AsOfMonthDatePicker
        label="As of Month"
        name="asOfMonth"
        control={control}
        disabled={!watch("investment")}
        error={errors.asOfMonth?.message}
        required={required("LOI executed")}
        color="default"
      />
      <MultipleFilesSelect
        label="Multiple Files"
        identifier="multipleFiles"
        control={control}
        onChange={(option: GenericLabelValueObject) => {
          setValue("multipleFiles", option.value as multipleFilesOptions);
        }}
        disabled={!watch("asOfMonth")}
        rules={{
          required: required("Multiple Files"),
        }}
      />
      <Button
        className={`${prefix}__submit-button`}
        type="submit"
        loading={isLoading}
        block={isLoading}
      >
        Generate Report
      </Button>
    </form>
  );
};
