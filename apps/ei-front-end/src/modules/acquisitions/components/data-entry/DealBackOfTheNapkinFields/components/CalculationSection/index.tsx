import { Divider } from "in-ui-react";
import { FC, PropsWithChildren } from "react";
import "./styles.css";

interface SectionProps extends PropsWithChildren {
  hasValue: boolean;
  extended?: boolean;
  noDivider?: boolean;
}
const Section: FC<SectionProps> = ({
  hasValue,
  children,
  extended = false,
  noDivider = false,
}) => {
  const getClasses = () => {
    const classes = ["acq-botn-calculation-section"];
    !hasValue && classes.push("acq-botn-calculation-section--empty");
    extended && classes.push("acq-botn-calculation-section--extended");
    return classes.join(" ");
  };

  return (
    <div className={getClasses()}>
      {!noDivider && <Divider />}
      <div className="acq-botn-calculation-section__grid">{children}</div>
    </div>
  );
};

const SubSection: FC<PropsWithChildren> = ({ children }) => {
  return <div className="acq-botn-calculation-subsection">{children}</div>;
};

export type CalculationSectionGroupType = typeof Section & {
  SubSection: typeof SubSection;
};

export const CalculationSection = Section as CalculationSectionGroupType;
CalculationSection.SubSection = SubSection;
