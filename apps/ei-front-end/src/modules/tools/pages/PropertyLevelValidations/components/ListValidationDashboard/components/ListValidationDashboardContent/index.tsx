import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { PropertyValidation } from "@/modules/tools/typings/property-level-validations";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import { FC, useMemo, useState } from "react";
import { ListValidationDashboardFilter } from "../../../../types";
import { ListValidationContentCardActions } from "./components/ListValidationContentCardActions";
import { ListValidationProperties } from "./components/ListValidationProperties";
import { getPropertiesBySearch, getPropertiesByStatus } from "./utils";

interface ListValidationDashboardContentProps {
  currentFilter: ListValidationDashboardFilter;
  data?: PropertyValidation[];
  className?: string;
}

export const ListValidationDashboardContent: FC<
  ListValidationDashboardContentProps
> = ({ currentFilter, data, className }) => {
  const [propertySearch, setPropertySearch] = useState<string>("");

  const filteredData = useMemo(() => {
    return getPropertiesBySearch({
      data: getPropertiesByStatus({ data, status: currentFilter }),
      search: propertySearch,
    });
  }, [data, propertySearch, currentFilter]);

  return (
    <main className={className}>
      <CardWithHeader
        title="List Validation: "
        icon={<DocumentCheckIcon />}
        bodyPadding={false}
        headerActions={
          <ListValidationContentCardActions
            onSearch={(search) => {
              setPropertySearch(search);
            }}
          />
        }
      >
        <ListValidationProperties data={filteredData} />
      </CardWithHeader>
    </main>
  );
};
