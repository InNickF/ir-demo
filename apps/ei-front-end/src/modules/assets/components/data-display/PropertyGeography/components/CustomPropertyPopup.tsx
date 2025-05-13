import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { readableNumber } from "@/commons/model-in/formatters/utils/amount-conversions";
import { PropertyGeography } from "@/modules/assets/typings/properties";
import { FC } from "react";

interface CustomPropertyPopupProps {
  property?: PropertyGeography;
}

export const CustomPropertyPopup: FC<CustomPropertyPopupProps> = ({
  property,
}) => {
  return (
    <div className="assets-geography__map-popup">
      <ul>
        <li>
          <strong>Address:</strong> {genericGetValue(property.address)}
        </li>
        <li>
          <strong>Fund:</strong> {genericGetValue(property.fund_name)}
        </li>
        <li>
          <strong>SF:</strong> {readableNumber(property.rentable_building_area)}
        </li>
        {/* <li>
          <strong>Status:</strong>{" "}
          {genericGetValue(getGenericValueOrString(property?.status))}
        </li> */}
      </ul>
    </div>
  );
};
