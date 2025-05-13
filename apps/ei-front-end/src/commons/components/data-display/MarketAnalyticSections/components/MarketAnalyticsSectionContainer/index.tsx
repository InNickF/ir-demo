import { Title } from "in-ui-react";
import { FC, PropsWithChildren } from "react";
import "./styles.css";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";

type SectionTitles =
  | "Supply, Demand, and Risk"
  | "Macroeconomics"
  | "Real Estate Fundamentals"
  | "Logistics Utility";

interface MarketAnalyticsSectionContainerProps extends PropsWithChildren {
  title: SectionTitles;
  className?: string;
}

export const MarketAnalyticsSectionContainer: FC<
  MarketAnalyticsSectionContainerProps
> = ({ title, className, children }) => {
  const prefix = "acq-analytics-section-divider";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <section className={getClasses()}>
      <Title kind="h2" className={`${prefix}__title`}>
        {convertToTitleCase(title)}
      </Title>
      {children}
    </section>
  );
};
