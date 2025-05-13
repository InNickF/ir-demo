import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { ListPropertyValidationFormPayload } from "@/modules/tools/typings/property-level-validations";
import { Button } from "in-ui-react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { validationFormCSSPrefix } from "..";
import { ListSelect } from "./ListSelect";
import { MonthListSelect } from "./MonthListSelect";
import { YearListSelect } from "./YearListSelect";

interface ListValidationFormProps {
  className?: string;
}

type ListPropertyValidationFormData = Omit<
  ListPropertyValidationFormPayload,
  "list"
> & {
  list_code: GenericLabelValueObject;
};

export const ListValidationForm: FC<ListValidationFormProps> = ({
  className,
}) => {
  const {
    handleSubmit,
    setValue,
    control,

    formState: { errors },
  } = useForm<ListPropertyValidationFormData>();
  const router = useRouter();

  const getClasses = (): string => {
    const classes = [`${validationFormCSSPrefix}__list-form`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const onSubmit = (data: ListPropertyValidationFormData) => {
    router.push({
      pathname: "/tools/",
      query: {
        list_code: data.list_code,
        month: data.month,
        year: data.year,
      },
    });
  };

  return (
    <form className={getClasses()} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 px-2 mb-6">
        <ListSelect
          label="List"
          identifier="list_code"
          control={control}
          color="glass"
          onChange={(option: GenericLabelValueObject) => {
            setValue("list_code", option.value);
          }}
          rules={{
            required: required("List"),
          }}
          error={errors?.["list"]?.message as string}
        />
        <div className="flex gap-2">
          <MonthListSelect
            label="Month"
            identifier="month"
            control={control}
            color="glass"
            rules={{
              required: required("Month"),
            }}
            error={errors?.["month"]?.message as string}
            onChange={(month: GenericLabelValueObject) =>
              setValue("month", month.value)
            }
          />
          <YearListSelect
            label="Year"
            identifier="year"
            control={control}
            color="glass"
            rules={{
              required: required("Year"),
            }}
            error={errors?.["year"]?.message as string}
            onChange={(year: GenericLabelValueObject) =>
              setValue("year", year.value)
            }
          />
        </div>
      </div>
      <Button type="submit" block>
        Generate Report
      </Button>
    </form>
  );
};
