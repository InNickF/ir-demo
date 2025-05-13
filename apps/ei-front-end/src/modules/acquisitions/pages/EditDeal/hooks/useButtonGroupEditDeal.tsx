import { DealPhase } from "@/acquisitions/typings/deals";
import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const editDealFilters = [
  "information",
  "photos",
  "back_of_the_napkin",
  "tenants",
  "risk_and_mitigants",
] as const;

type EditDealFilters = typeof editDealFilters[number];

interface IUseButtonGroupEditDeal {
  phase?: DealPhase;
  hasUwModel?: boolean;
}

export const useButtonGroupEditDeal = ({
  hasUwModel = false,
}: IUseButtonGroupEditDeal) => {
  const [editDealFilter, setEditDealFilter] = useState<EditDealFilters>(
    editDealFilters[0]
  );

  const editDealFilterItems: ButtonGroupItem[] = [
    {
      key: "information",
      text: "Information",
      onClick: (key) => setEditDealFilter(key as EditDealFilters),
    },
    {
      key: "photos",
      text: "Photos",
      onClick: (key) => setEditDealFilter(key as EditDealFilters),
    },
    {
      key: "tenants",
      text: "Tenants",
      onClick: (key) => setEditDealFilter(key as EditDealFilters),
    },
    {
      key: "risk_and_mitigants",
      text: "Risk and Mitigants",
      onClick: (key) => setEditDealFilter(key as EditDealFilters),
    },
  ];

  if (!hasUwModel) {
    editDealFilterItems.splice(1, 0, {
      key: "back_of_the_napkin",
      text: "Back of the Napkin",
      onClick: (key) => setEditDealFilter(key as EditDealFilters),
    });
  }

  const dealInformationClasses =
    editDealFilter === "information" ? undefined : "hidden";
  const dealPhotosClasses = editDealFilter === "photos" ? undefined : "hidden";
  const dealBackOfTheNapkinClasses =
    editDealFilter === "back_of_the_napkin" ? undefined : "hidden";
  const dealTenantsClasses =
    editDealFilter === "tenants" ? undefined : "hidden";
  const dealRiskAndMitigantsClasses =
    editDealFilter === "risk_and_mitigants" ? undefined : "hidden";

  return {
    editDealFilter,
    editDealFilterItems,
    dealInformationClasses,
    dealPhotosClasses,
    dealBackOfTheNapkinClasses,
    dealTenantsClasses,
    dealRiskAndMitigantsClasses,
  };
};
