import { required } from "@/commons/utils/input-validations";
import { compstackCompInputPrefix } from ".";
import { CompFormYearListSelect } from "../../components/CompFormFields/CompFormYearListSelect";
import { CompstackCompFormFieldRenderer } from "../../types";
import { compstackCompsSaleAndLandCommonForm } from "./compstackCompCommonFormFields";
import { GenericLabelValueObject } from "@/commons/typings";

export const compstackCompSaleForm: CompstackCompFormFieldRenderer<"sale">[] = [
  ...compstackCompsSaleAndLandCommonForm.slice(0, 5),
  {
    key: "year_built",
    render: ({
      state: {
        control,
        setValue,
        watch,
        formState: { errors },
      },
    }) => (
      <CompFormYearListSelect
        control={control}
        label="Year Built"
        identifier="year_built"
        yearSelected={watch("year_built")}
        className={`${compstackCompInputPrefix}__input`}
        error={errors.year_built?.message as string}
        rules={{ required: required("Year Built") }}
        onChange={(year: GenericLabelValueObject) => {
          setValue("year_built", Number(year.value));
        }}
      />
    ),
  },
  ...compstackCompsSaleAndLandCommonForm.slice(5),
];
