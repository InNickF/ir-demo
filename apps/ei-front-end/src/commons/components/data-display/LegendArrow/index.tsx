import { FC } from "react";
import { Icon, IconProps } from "in-ui-react";
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import "./styles.css";

export interface LegendArrowProps {
  upText: string;
  rightText: string;
  upIcon?: IconProps["svg"];
  rightIcon?: IconProps["svg"];
}

export const LegendArrow: FC<LegendArrowProps> = ({
  upText,
  upIcon = <ArrowUpIcon />,
  rightText,
  rightIcon = <ArrowRightIcon />,
}) => {
  return (
    <section className="legend-arrows">
      <div className="legend-arrows__item">
        <Icon size="small" svg={upIcon} />
        <p>{upText}</p>
      </div>
      <div className="legend-arrows__item">
        <Icon size="small" svg={rightIcon} />
        <p>{rightText}</p>
      </div>
    </section>
  );
};
