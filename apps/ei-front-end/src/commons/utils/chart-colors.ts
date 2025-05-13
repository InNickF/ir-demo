export const lightChartColors = [
  "#a2bd78",
  "#46864f",
  "#40b5a7",
  "#4c94b1",
  "#bd583f",
  "#c6b994",
  "#446fba",
  "#6757a8",
  "#cd7d29",
  "#c9b362",
  "#7958a4",
  "#ad3623",
  "#7c9ab6",
  "#bb5c85",
  "#224EA9",
  "#caa142",
  "#a25ba7",
  "#a97eac",
  "#bd8541",
  "#5e6eb8",
  "#b73b47",
  "#888888",
];
export const darkChartColors = [
  "#b6d587",
  "#46864f",
  "#44b9ab",
  "#4c94b1",
  "#c36047",
  "#F5E6B8",
  "#5285DA",
  "#7864c5",
  "#F29330",
  "#F3D97A",
  "#916BC3",
  "#E95B44",
  "#9bbfe0",
  "#CF6694",
  "#224EA9",
  "#F6C652",
  "#B377B7",
  "#D3A4D6",
  "#D19347",
  "#5e6eb8",
  "#e36470",
  "#888888",
];

interface IGenerateComplementaryColors {
  baseColors: string[];
  numColors: number;
}

export const generateComplementaryColors = ({
  baseColors,
  numColors,
}: IGenerateComplementaryColors): string[] => {
  const generatedColors: string[] = [];
  let colorIndex = 0;

  for (let i = 0; i < numColors; i++) {
    const baseColor = baseColors[colorIndex];
    const modifiedColor = modifyColor(baseColor);
    generatedColors.push(modifiedColor);
    colorIndex = (colorIndex + 1) % baseColors.length;
  }

  return generatedColors;
};

/**
 * This function modifies a given color by a
 * random amount within a certain range
 * */
export const modifyColor = (color: string): string => {
  // Parse the red, green, and blue components from the input color
  // The color is expected to be in the format #RRGGBB
  const [r, g, b] = [
    parseInt(color.substring(1, 3), 16),
    parseInt(color.substring(3, 5), 16),
    parseInt(color.substring(5, 7), 16),
  ];

  // Generate a random variation for each color component
  // The variation is a random integer between -10 and 10
  const rVariation = Math.floor(Math.random() * 21) - 10;
  const gVariation = Math.floor(Math.random() * 21) - 10;
  const bVariation = Math.floor(Math.random() * 21) - 10;

  // Apply the variation to each color component
  // The resulting color component is clamped to the range 0-255
  const modifiedR = clamp(r + rVariation, 0, 255);
  const modifiedG = clamp(g + gVariation, 0, 255);
  const modifiedB = clamp(b + bVariation, 0, 255);

  // Convert the modified color components back to a hex color string
  const modifiedColor =
    "#" +
    modifiedR.toString(16).padStart(2, "0") +
    modifiedG.toString(16).padStart(2, "0") +
    modifiedB.toString(16).padStart(2, "0");

  return modifiedColor;
};

export const clamp = (value: number, min: number, max: number): number => {
  return value < min ? min : value > max ? max : value;
};
