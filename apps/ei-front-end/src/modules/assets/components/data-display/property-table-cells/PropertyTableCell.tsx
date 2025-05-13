import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";
import { Property } from "@/modules/assets/typings/properties";
import { propertyFormatter } from "@/modules/assets/entities/asset/formatters";
import { getPropertyURL } from "@/modules/assets/utils/redirects/properties-redirects";
import { Link, Tooltip } from "in-ui-react";
import { default as NextLink } from "next/link";
import { FC, PropsWithChildren } from "react";
import { PropertyTableCellWrapper } from "./PropertyTableCellWrapper";
import { PropertyCellContext } from "./types";

interface PropertyCellProps<TKey extends keyof Property> {
  propertyKey: TKey;
  info: PropertyCellContext<Property[TKey]>;
  maxLength?: number;
  redirectToAsset?: boolean;
}
export const PropertyTableCell = <TKey extends keyof Property>({
  propertyKey,
  info,
  maxLength = 60,
  redirectToAsset = false,
}: PropertyCellProps<TKey>) => {
  const { value, className } = propertyFormatter.value.format({
    key: propertyKey,
    value: info?.getValue() as unknown as Property[TKey],
  });
  const isTooLong = value?.length > maxLength;
  const slicedValue = slicedTextWithEllipsis({
    text: value,
    maxLength,
  });

  return (
    <PropertyTableCellWrapper className={className}>
      {isTooLong ? (
        <Tooltip content={value} hidden={!isTooLong}>
          <CellContent
            propertyId={info?.row?.original?.yardi_property_code}
            redirectToAsset={redirectToAsset}
          >
            {slicedValue}
          </CellContent>
        </Tooltip>
      ) : (
        <CellContent
          propertyId={info?.row?.original?.yardi_property_code}
          redirectToAsset={redirectToAsset}
        >
          {value}
        </CellContent>
      )}
    </PropertyTableCellWrapper>
  );
};

interface CellContentProps {
  redirectToAsset: boolean;
  propertyId: string;
}
const CellContent: FC<PropsWithChildren<CellContentProps>> = ({
  redirectToAsset,
  propertyId,
  children,
}) => {
  if (redirectToAsset && propertyId) {
    return (
      <NextLink
        href={getPropertyURL({
          propertyId,
          section: "details",
        })}
      >
        <Link>{children}</Link>
      </NextLink>
    );
  }

  return <>{children}</>;
};
