import { FC } from "react";
import { DealGeoLocation } from "@/acquisitions/typings/deals";
import { getGenericValueOrString } from "@/commons/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";

interface CustomDealPopupProps {
  deal?: DealGeoLocation;
}

export const CustomDealPopup: FC<CustomDealPopupProps> = ({ deal }) => {
  return (
    <div className="acq-deals-geography__map-popup">
      <ul>
        <li>
          <strong>Name:</strong> {genericGetValue(deal.name)}.
        </li>
        <li>
          <strong>Address:</strong> {genericGetValue(deal.address)}.
        </li>
        <li>
          <strong>Fund:</strong> {genericGetValue(deal.fund__name)}.
        </li>
        <li>
          <strong>SF:</strong> {genericGetValue(deal.sf)}.
        </li>
        <li>
          <strong>Equity:</strong> {genericGetValue(deal.equity)}.
        </li>
        <li>
          <strong>Status:</strong>{" "}
          {genericGetValue(getGenericValueOrString(deal?.status))}.
        </li>
        <li>
          <strong>Phase:</strong>{" "}
          {genericGetValue(getGenericValueOrString(deal?.phase))}.
        </li>
        <li>
          <strong>Status:</strong>{" "}
          {genericGetValue(getGenericValueOrString(deal?.status))}.
        </li>
        <li>
          <strong>Officer:</strong>{" "}
          {genericGetValue(getGenericValueOrString(deal?.officer?.label))}.
        </li>
      </ul>
    </div>
  );
};
