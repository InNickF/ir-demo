import { PropertyValidation } from "@/modules/tools/typings/property-level-validations";
import { FC } from "react";
import "./styles.css";
import { PropertyValidationItem } from "./components/PropertyValidationItem";

interface ListValidationPropertiesProps {
  data?: PropertyValidation[];
}

export const ListValidationProperties: FC<ListValidationPropertiesProps> = ({
  data,
}) => {
  return (
    <section className="plv-list-validation-properties-container">
      {data?.map((property) => {
        return (
          <PropertyValidationItem
            key={property.property_code}
            property={property}
          />
        );
      })}
    </section>
  );
};
