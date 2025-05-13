import { Tag, TagProps } from "in-ui-react";
import { FC } from "react";

interface PropertyStatusSummaryProps {
  failed: number;
  succeeded: number;
}

export const PropertyStatusSummary: FC<PropertyStatusSummaryProps> = ({
  failed,
  succeeded,
}) => {
  const getPropertyStatus = () => {
    return failed > 0 ? "Failed" : "Passed";
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <PropertyTag
        label="Failed"
        color={failed > 0 ? "error" : "primary"}
        value={failed?.toString() || "0"}
        circle
      />
      <PropertyTag
        label="Passed"
        color={succeeded > 0 ? "success" : "primary"}
        value={succeeded?.toString() || "0"}
        circle
      />
      <PropertyTag
        label="Status"
        color={getPropertyStatus() === "Failed" ? "error" : "success"}
        value={getPropertyStatus()}
      />
    </div>
  );
};

interface PropertyTagProps {
  label: string;
  color?: TagProps["color"];
  circle?: boolean;
  value: string;
}
const PropertyTag: FC<PropertyTagProps> = ({
  label,
  color = "primary",
  circle,
  value,
}) => {
  const getClasses = () => {
    const classes = [];
    !circle && classes.push("min-w-[90px] grid justify-center");
    return classes.join(" ");
  };
  return (
    <div className="flex items-center gap-1">
      <small className="text-silver">{label}:</small>
      <div>
        <Tag
          className={getClasses()}
          text={value}
          color={color}
          circle={circle}
          size="small"
        />
      </div>
    </div>
  );
};
