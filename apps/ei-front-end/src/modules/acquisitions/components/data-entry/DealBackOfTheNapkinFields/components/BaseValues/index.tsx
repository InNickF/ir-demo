import {
  numberToDollar,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { Heading } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface BaseValuesProps {
  purchasePrice: number;
  sf: number;
  psf: number;
  className?: string;
}

export const BaseValues: FC<BaseValuesProps> = ({
  purchasePrice,
  sf,
  psf,
  className,
}) => {
  const getClasses = () => {
    const classes = ["acq-botn-base-values"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <div className={getClasses()}>
      <Heading kind="subtitle-2" className="acq-botn-base-values__header">
        Base values
      </Heading>
      <div className="acq-botn-base-values__fields">
        <div className="acq-botn-base-values__field-grid">
          <Heading kind="h5">Purchase Price</Heading>
          <p>{numberToDollar({ value: purchasePrice })}</p>
        </div>
        <div className="acq-botn-base-values__field-grid">
          <Heading kind="h5">SF</Heading>
          <p>{readableNumber(sf)}</p>
        </div>
        <div className="acq-botn-base-values__field-grid">
          <Heading kind="h5">PSF</Heading>
          <p>{numberToDollar({ value: psf })}</p>
        </div>
      </div>
    </div>
  );
};
