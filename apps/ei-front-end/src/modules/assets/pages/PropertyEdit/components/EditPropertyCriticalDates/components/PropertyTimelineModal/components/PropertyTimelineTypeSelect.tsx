import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useAssetsFilters } from "@/modules/assets/services/queries/filters";
import { useEffect, useState } from "react";

export const PropertyTimelineTypeSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
      side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const { data: filters, isLoading } = useAssetsFilters();

  const options =
    filters?.find(
      (filter) => filter.key === "property-under-management-timeline-item_type"
    )?.options || [];

  return (
    <>
      {domLoaded ? (
        <GenericControlledSelect
          {...props}
          options={options as Options[]}
          placeholder="Type"
          menuPortalTarget={document.body}
          isLoading={isLoading}
        />
      ) : null}
    </>
  );
};
