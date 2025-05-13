import { GenericLabelValueObject } from "@/commons/typings";
import { Empty } from "in-ui-react";
import { FC, useMemo } from "react";
import { SimpleLabelValueCell } from "./components/SimpleLabelValueCell";
import { SimpleLabelValueGridKind } from "./types";
import "./styles.css";

export interface SimpleLabelValueGridProps extends SimpleLabelValueGridKind {
  items: GenericLabelValueObject[];
  searchQuery?: string;
  className?: string;
  noGrow?: boolean;
}

export const SimpleLabelValueGrid: FC<SimpleLabelValueGridProps> = ({
  items = null,
  searchQuery = null,
  className,
  kind = "small",
  noGrow = false,
}) => {
  const prefix = "commons-simple-label-value-grid";

  const getClasses = () => {
    const classes = [`${prefix}`];
    noGrow && classes.push(`${prefix}--no-grow`);
    className && classes.push(className);
    return classes.join(" ");
  };

  const filteredMetrics: GenericLabelValueObject[] = useMemo(() => {
    return searchQuery
      ? items?.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items || [];
  }, [items, searchQuery]);

  return (
    <ul className={getClasses()}>
      {filteredMetrics?.length > 0 ? (
        filteredMetrics?.map(({ label, value }) => {
          return (
            <SimpleLabelValueCell
              key={`${label}-${value}`}
              isSearching={!!searchQuery}
              label={label}
              value={value}
              kind={kind}
            />
          );
        })
      ) : (
        <Empty className="mx-auto" />
      )}
    </ul>
  );
};
