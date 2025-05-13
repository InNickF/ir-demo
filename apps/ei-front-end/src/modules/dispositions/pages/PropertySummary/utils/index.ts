import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";

export const generatePriceWithPSFString = ({
  amount,
  sf,
}: {
  amount?: number | string;
  sf?: number;
}): string => {
  if (!amount) {
    return genericNoDataText;
  }

  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }

  const formattedPrice = numberToDollar({
    value: amount,
    options: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });

  const formattedPSF = numberToDollar({
    value: amount / sf,
    options: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });

  if (amount && !sf) {
    return formattedPrice;
  }

  return `${formattedPrice} (${formattedPSF} PSF)`;
};
