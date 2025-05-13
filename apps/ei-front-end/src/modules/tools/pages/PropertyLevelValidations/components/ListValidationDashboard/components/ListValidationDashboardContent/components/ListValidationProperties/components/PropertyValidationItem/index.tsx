import { PropertyStatusSummary } from "@/modules/tools/pages/PropertyLevelValidations/components/PropertyStatusSummary";
import { PropertyValidation } from "@/modules/tools/typings/property-level-validations";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button, Heading } from "in-ui-react";
import { FC, useState } from "react";
import { PropertyValidationItemDetails } from "./components/PropertyValidationItemDetails";
import "./styles.css";
import { LastUpdatedTag } from "@/modules/tools/pages/PropertyLevelValidations/components/LastUpdatedTag";

interface PropertyValidationItemProps {
  property: PropertyValidation;
}

const prefix = "plv-property-validation-item";
export const PropertyValidationItem: FC<PropertyValidationItemProps> = ({
  property,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [wasOpened, setWasOpened] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    if (!wasOpened) {
      setWasOpened(true);
    }
  };

  const getClasses = () => {
    const classes = [prefix, "in-ui-animation--appears"];
    return classes.join(" ");
  };

  const getIconClasses = () => {
    const classes = [`${prefix}__header__button-icon`];
    isOpen && classes.push(`${prefix}__header__button-icon--rotated`);
    return classes.join(" ");
  };

  return (
    <article className={getClasses()}>
      <section className={`${prefix}-header-container`}>
        <header className={`${prefix}__header`}>
          <Button
            onlyIcon
            kind="ghost"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            icon={<ChevronDownIcon className={getIconClasses()} />}
          />
          <Heading kind="h6" className="p-2 font-bold">
            {property?.property_name} ({property?.property_code})
          </Heading>
        </header>
        <aside className={`${prefix}__aside`}>
          <LastUpdatedTag lastUpdated={property?.last_updated} />
          <PropertyStatusSummary
            failed={property?.failed}
            succeeded={property?.succeeded}
          />
        </aside>
      </section>
      <PropertyValidationItemDetails
        propertyId={property?.property_code}
        isOpen={isOpen}
        wasOpened={wasOpened}
      />
    </article>
  );
};
