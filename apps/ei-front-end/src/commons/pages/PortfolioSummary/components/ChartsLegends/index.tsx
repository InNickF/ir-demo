import { darkColors, lightColors } from "@/commons/utils/amcharts5";
import { Skeleton, useTheme } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface ChartsLegendsProps {
  className?: string;
  legends: string[];
  isLoading?: boolean;
}

const ChartsLegends: FC<ChartsLegendsProps> = ({
  className,
  legends,
  isLoading = false,
}) => {
  const prefix = "debt-portfolio-summary-page__charts-legends";
  const { theme } = useTheme();

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const legendColors = theme.includes("light") ? lightColors : darkColors;

  return (
    <div className={getClasses()}>
      <div>Legends:</div>
      {!isLoading ? (
        legends?.map((legend, index) => (
          <div key={legend} className={`${prefix}-container`}>
            <span
              className={`${prefix}-color-dot`}
              style={{ backgroundColor: legendColors[index] }}
            ></span>
            <p className={`${prefix}-label`}>{legend}</p>
          </div>
        ))
      ) : (
        <Skeleton>
          <Skeleton.Avatar
            size="small"
            shape="squared"
            className={`${prefix}__skeleton`}
          />
        </Skeleton>
      )}
    </div>
  );
};

export default ChartsLegends;
