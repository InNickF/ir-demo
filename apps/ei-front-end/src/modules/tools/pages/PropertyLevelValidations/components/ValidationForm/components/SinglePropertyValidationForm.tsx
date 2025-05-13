import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { SinglePropertyValidationFormPayload } from "@/modules/tools/typings/property-level-validations";
import { Button } from "in-ui-react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { validationFormCSSPrefix } from "..";
import { MonthListSelect } from "./MonthListSelect";
import { PropertySelect } from "./PropertySelect";
import { YearListSelect } from "./YearListSelect";

interface ListValidationFormProps {
  className?: string;
}

type SinglePropertyValidationFormData = Omit<
  SinglePropertyValidationFormPayload,
  "property"
> & {
  property: GenericLabelValueObject;
};

export const SinglePropertyValidationForm: FC<ListValidationFormProps> = ({
  className,
}) => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SinglePropertyValidationFormData>();
  const router = useRouter();

  const getClasses = (): string => {
    const classes = [`${validationFormCSSPrefix}__list-form`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const onSubmit = (data: SinglePropertyValidationFormData) => {
    router.push({
      pathname: "/tools/",
      query: {
        property: data.property.value,
        month: data.month,
        year: data.year,
      },
    });
  };

  return (
    <form className={getClasses()} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 px-2 mb-6">
        <PropertySelect
          label="Property"
          identifier="property"
          control={control}
          color="glass"
          onChange={(option: GenericLabelValueObject) => {
            setValue("property", option);
          }}
          rules={{
            required: required("Property"),
          }}
          error={errors?.["property"]?.message as string}
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
