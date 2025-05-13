import { AddressLatLngInput } from "@/acquisitions/components/data-entry/DealInformationFormInputs/components/AddressLatLngInput";
import { useCompFilters } from "@/acquisitions/services/queries/filters";
import { StabilizedProperty } from "@/acquisitions/typings/market-analytics";
import { GenericLabelValueObject } from "@/commons/typings";
import {
  lessOrEqualToOneHundred,
  moreOrEqualToZero,
  onlyNumbers,
  required,
} from "@/commons/utils/input-validations";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { Button, Input, Modal, TextArea } from "in-ui-react";
import { ComponentProps, ComponentType, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { CompFormProps } from "../../types";
import "./styles.css";
import {
  GenericControlledSelect,
  GenericControlledSelectProps,
} from "@/commons/components/data-entry/GenericControlledSelect";

export const StabilizedPropertiesForm: FC<CompFormProps> = ({
  actionText,
  cancelText,
  comp,
  onAction,
  onCancel,
  useMutation,
}) => {
  const defaultValues =
    comp && comp.type === "stabilized_property" ? comp : null;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<StabilizedProperty>({
    defaultValues: { ...defaultValues, type: "stabilized_property" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation<StabilizedProperty>();

  const onSubmit = async (data: StabilizedProperty) => {
    setIsLoading(true);
    mutation.mutate(
      { ...data, type: "stabilized_property" }, // Forcing type
      {
        onSettled: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          onAction();
        },
      }
    );
  };

  const { data: filtersData = [], isLoading: isFiltersLoading } =
    useCompFilters();

  const submarkets =
    filtersData.find((filter) => filter.key === "submarket")?.options || [];

  type GenericComponent<TComponent extends ComponentType> = {
    Component: TComponent;
    props: ComponentProps<TComponent>;
  };
  type Selects = {
    Component: typeof GenericControlledSelect;
    props: GenericControlledSelectProps<
      GenericLabelValueObject,
      false,
      StabilizedProperty
    > & {
      name: keyof StabilizedProperty;
    };
  };

  const inputs: Array<
    | GenericComponent<
        | typeof Input
        | typeof TextArea
        | typeof AddressLatLngInput<StabilizedProperty>
      >
    | Selects
  > = [
    {
      Component: Input,
      props: {
        label: "Date",
        name: "date",
        type: "date",
        leftIcon: <CalendarIcon />,
        ...register("date", {
          required: required("Date"),
        }),
      },
    },
    {
      Component: AddressLatLngInput,
      props: {
        setValue,
        getValues,
        register,
        defaultValue: getValues("address"),
        name: "address",
      },
    },
    {
      Component: GenericControlledSelect,
      props: {
        label: "Submarket",
        name: "submarket",
        identifier: "submarket",
        control,
        options: submarkets,
        isLoading: isFiltersLoading,
      },
    },
    {
      Component: Input,
      props: {
        label: "Price",
        type: "number",
        leftIcon: <CurrencyDollarIcon />,
        ...register("price", {
          required: required("Price"),
          pattern: onlyNumbers(),
        }),
      },
    },
    {
      Component: Input,
      props: {
        label: "SF",
        type: "number",
        ...register("sf", {
          required: required("SF"),
          pattern: onlyNumbers(),
        }),
      },
    },
    {
      Component: Input,
      props: {
        label: "Price/SF",
        type: "number",
        leftIcon: <CurrencyDollarIcon />,
        ...register("price_sf", {
          required: required("Price/SF"),
          pattern: onlyNumbers(),
        }),
      },
    },
    {
      Component: Input,
      props: {
        label: "Cap Rate",
        type: "number",
        leftIcon: <ReceiptPercentIcon />,
        ...register("cap_rate", {
          required: required("Cap Rate"),
          pattern: onlyNumbers(),
          min: moreOrEqualToZero("Cap Rate"),
          max: lessOrEqualToOneHundred("Cap Rate"),
        }),
      },
    },
    {
      Component: Input,
      props: {
        label: "Buyer",
        ...register("buyer", {
          required: required("Buyer"),
        }),
      },
    },
    {
      Component: Input,
      props: {
        label: "Seller",
        className: "col-span-1 md:col-span-2",
        ...register("seller", {
          required: required("Seller"),
        }),
      },
    },
    {
      Component: TextArea,
      props: {
        label: "Notes",
        className: "col-span-1 md:col-span-2",
        ...register("notes"),
      },
    },
    {
      Component: Input,
      props: {
        label: "Type",
        type: "hidden",
        className: "hidden",
        ...register("type", {
          required: required("Type"),
        }),
      },
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body className="acq-comps-form-grid">
        {inputs.map((input) => {
          const { Component, props } = input;
          return (
            <Component
              key={props.name}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(props as any)}
              error={errors?.[props.name]?.message}
            />
          );
        })}
      </Modal.Body>
      <footer className="acq-comps-form-footer">
        <Button
          className="w-full"
          block
          kind="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button className="w-full" block loading={isLoading} type="submit">
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
