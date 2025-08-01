interface GenerateColorsResponse {
  bgColor: string;
  borderColor: string;
  textColor: string;
}

/**
 * Generates Tailwind CSS class names for background, border, and text colors
 * based on a given input string. The same input will always produce the same
 * color combination, useful for consistent avatar or group color assignment.
 *
 * @param input - The string to generate color classes from.
 * @returns An object containing bgColor, borderColor, and textColor class names.
 */

export const generateColors = (input: string): GenerateColorsResponse => {
  const bgColors = [
    "bg-red-950",
    "bg-blue-950",
    "bg-green-950",
    "bg-yellow-950",
    "bg-purple-950",
  ];
  const borderColors = [
    "border border-red-500",
    "border border-blue-500",
    "border border-green-500",
    "border border-yellow-500",
    "border border-purple-500",
  ];
  const textColors = [
    "text-red-100",
    "text-blue-100",
    "text-green-100",
    "text-yellow-100",
    "text-purple-100",
  ];
  const hash = input.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  const index = hash % bgColors.length;

  return {
    bgColor: bgColors[index],
    borderColor: borderColors[index],
    textColor: textColors[index],
  };
};
