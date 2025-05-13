import { Tag } from "in-ui-react";

export const LastUpdatedTag = ({ lastUpdated }: { lastUpdated?: string }) => {
  const getClasses = () => {
    const classes = ["text-silver"];
    !lastUpdated && classes.push("hidden");
    return classes.join(" ");
  };
  return (
    <Tag
      className={getClasses()}
      text={`Last Updated: ${lastUpdated || "N/A"}`}
      size="small"
      textSliceLength={Infinity}
    />
  );
};
