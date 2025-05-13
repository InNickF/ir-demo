import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { GenericLabelValueObject } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { defaultScreeningFieldsFormatters } from "@/modules/acquisitions/utils/formatters/default-screening-fields-formatters";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Empty } from "in-ui-react";
import { FC, useMemo } from "react";

interface DealBasicsKeys {
  key: keyof Deal;
  label: string;
}

const dealBasicKeys: DealBasicsKeys[] = [
  {
    key: "market",
    label: "Market",
  },
  {
    key: "latest_follow_up",
    label: "Latest Follow Up",
  },
  {
    key: "latest_loi_submission",
    label: "Latest LOI Submission",
  },
  {
    key: "date_check_in",
    label: "Date Check In",
  },
  {
    key: "broker_name",
    label: "Broker",
  },
  {
    key: "landlord",
    label: "Landlord",
  },
  {
    key: "seller",
    label: "Seller",
  },
  {
    key: "pricing_guidance",
    label: "Pricing Guidance",
  },
  {
    key: "sf",
    label: "SF",
  },
  {
    key: "occupancy_at_acquisitions",
    label: "% Occupancy at Acquisition",
  },
  {
    key: "officer",
    label: "Officer",
  },
  {
    key: "officer_status",
    label: "Officer Status",
  },
  {
    key: "officer_note",
    label: "Officer Note",
  },
  {
    key: "analyst",
    label: "Analyst",
  },
];

interface DealBasicsProps extends Omit<CardWithHeaderProps, "title" | "icon"> {
  deal: Deal;
}

export const DealBasics: FC<DealBasicsProps> = ({ deal, ...cardProps }) => {
  const dealBasicsItems: GenericLabelValueObject[] = useMemo(() => {
    return dealBasicKeys.map((item) => {
      const formatter = defaultScreeningFieldsFormatters.find(
        (formatter) => formatter.key === item.key
      );
      const value = deal?.[item.key] as string | number | undefined;

      const formattedValue = formatter
        ? formatter?.formatter(value)
        : genericGetValue(value);

      return {
        label: item.label,
        value: String(formattedValue),
      };
    });
  }, [deal]);

  return (
    <CardWithHeader
      title="Deal Basics"
      icon={<DocumentMagnifyingGlassIcon />}
      bodyPadding={false}
      {...cardProps}
    >
      {deal ? (
        <SimpleLabelValueGrid kind="large" items={dealBasicsItems} />
      ) : (
        <Empty />
      )}
    </CardWithHeader>
  );
};
