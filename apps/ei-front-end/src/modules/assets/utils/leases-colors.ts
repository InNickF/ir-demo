interface ILeasesBaseColors {
  green: string;
  red: string;
  yellow: string;
  orange: string;
  grey: string;
}

interface ILeasesColors {
  baseColors: string[];
  opacity?: number;
}

const hexToRgba = (hex: string, opacity: number): string => {
  const hexColor = hex.replace("#", "");
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const leasesColors = ({
  baseColors,
  opacity = 1,
}: ILeasesColors): ILeasesBaseColors => {
  return {
    green: hexToRgba(baseColors[0], opacity),
    red: hexToRgba(baseColors[20], opacity),
    yellow: hexToRgba(baseColors[9], opacity),
    orange: hexToRgba(baseColors[8], opacity),
    grey: "#9C9C9C",
  };
};
