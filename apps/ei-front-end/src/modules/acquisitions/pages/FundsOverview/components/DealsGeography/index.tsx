import { FC } from "react";
import { CardProps } from "in-ui-react";
import { DealsGeographyMap } from "./components/DealsGeographyMap";
import { MapIcon } from "@heroicons/react/24/outline";
import { useDealsLocations } from "@/acquisitions/services/queries/deals";
import { GenericFilterPayload } from "@/commons/typings";
import "./styles.css";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";

interface DealsGeographyProps extends CardProps {
  filters: GenericFilterPayload;
}

export const DealsGeography: FC<DealsGeographyProps> = ({
  filters,
  ...props
}) => {
  const { data, isLoading, isRefetching } = useDealsLocations(filters);

  return (
    <CardWithHeader
      isLoading={isLoading}
      isRefetching={isRefetching}
      title="Geography"
      icon={<MapIcon />}
      hasDataToShow={!!data?.length}
      padding={false}
      {...props}
    >
      <DealsGeographyMap data={data} />
    </CardWithHeader>
  );
};
