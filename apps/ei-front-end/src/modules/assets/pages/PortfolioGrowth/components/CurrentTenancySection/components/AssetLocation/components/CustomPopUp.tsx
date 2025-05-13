import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { AssetLocationTenantByProperty } from "@/modules/assets/typings/asset-growth";
import { FC } from "react";

interface CustomPropertyPopupProps {
  property?: AssetLocationTenantByProperty;
}

export const CustomPropertyPopup: FC<CustomPropertyPopupProps> = ({
  property,
}) => {
  return (
    <div className="acq-deals-geography__map-popup">
      <ul>
        <li>
          <strong>Address:</strong> {genericGetValue(property.address)}
        </li>
        <li>
          <strong>SF:</strong> {readableNumber(property.rentable_area)}
        </li>
        <li>
          <strong>NOI:</strong>{" "}
          {numberToDollar({
            value: property.annual_rent,
            options: {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            },
          })}
        </li>
        {property?.values?.map((item, index) => (
          <li key={index}>
            <strong>
              {convertToTitleCase(
                humanizeSnakeCase(String(genericGetValue(item.label, true)))
              )}
              :
            </strong>{" "}
            {genericGetValue(item?.value)}
          </li>
        ))}
      </ul>
    </div>
  );
};
