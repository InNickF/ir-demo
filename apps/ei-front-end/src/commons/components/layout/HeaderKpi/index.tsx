import { deprecated_ellipseLongText } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { Heading, Skeleton, Tag, TagProps, Tooltip } from "in-ui-react";
import { FC, ReactElement } from "react";
import "./styles.css";

interface HeaderKpiProps {
  title: string | ReactElement;
  value: string;
  isLoading?: boolean;
  ellipsis?: boolean;
  ellipsisLength?: number;
  noWrap?: boolean;
  tag?: TagProps["color"];
  onClick?: () => void;
}

const KpiValue: FC<
  Pick<
    HeaderKpiProps,
    "value" | "tag" | "ellipsis" | "ellipsisLength" | "noWrap"
  >
> = ({
  value,
  tag = null,
  ellipsis = false,
  ellipsisLength = 18,
  noWrap = false,
}) => {
  const getClasses = () => {
    const classes = ["commons-header-kpi__value", "text-center"];
    noWrap && classes.push("whitespace-nowrap");
    return classes.join(" ");
  };
  const parsedValue = genericGetValue(value);
  const getFinalValue = () => {
    if (!ellipsis) {
      return parsedValue;
    }
    return deprecated_ellipseLongText({
      text: parsedValue,
      maxLength: ellipsisLength,
    });
  };

  const renderTooltip = getFinalValue().length >= ellipsisLength && ellipsis;
  const tooltipContent = renderTooltip ? parsedValue : "";

  return (
    <Tooltip content={tooltipContent} hidden={!renderTooltip}>
      {tag ? (
        <Tag
          textSliceLength={15}
          text={getFinalValue()}
          color={tag}
          size="small"
          className={getClasses()}
        />
      ) : (
        <Heading kind="h6" className={getClasses()}>
          {getFinalValue()}
        </Heading>
      )}
    </Tooltip>
  );
};

export const HeaderKpi: FC<HeaderKpiProps> = ({
  title,
  value,
  tag,
  isLoading = false,
  onClick = null,
  ellipsis = false,
  ellipsisLength,
  noWrap = false,
}) => {
  const getClasses = () => {
    const classes = ["commons-header-kpi"];
    onClick && classes.push("commons-header-kpi__clickable");
    return classes.join(" ");
  };

  return (
    <div className={getClasses()} onClick={onClick}>
      {isLoading ? (
        <Skeleton>
          <Skeleton.Text className="w-12 h-6" />
        </Skeleton>
      ) : (
        <KpiValue
          value={value}
          tag={tag}
          ellipsis={ellipsis}
          ellipsisLength={ellipsisLength}
          noWrap={noWrap}
        />
      )}
      <p className="text-center text-md whitespace-nowrap">{title}</p>
    </div>
  );
};
