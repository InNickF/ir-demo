import { Select } from "in-ui-react";
import { FC } from "react";

type FilterByProperty = {
  label: string;
  value: string;
};

interface FilterByPropertyProps {
  properties: FilterByProperty[];
  isLoading?: boolean;
  setPropertyId: (propertyId: string) => void;
}

export const FilterByProperty: FC<FilterByPropertyProps> = ({
  properties = [],
  isLoading,
  setPropertyId,
}) => {
  return (
    <>
      {!isLoading ? (
        <div className="asset-investor-page__grid-full">
          <Select
            color="over-ghost"
            options={properties}
            defaultValue={properties[0]}
            isLoading={isLoading}
            className="asset-select-filter"
            onChange={(option) => {
              setPropertyId(option.value);
            }}
          />
        </div>
      ) : null}
    </>
  );
};
