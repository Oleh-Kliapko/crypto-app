export const percentageDiff = (a: number, b: number): number => {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export const rounding = (n: number): number => {
  if (!n) return 0;
  if (n < 0.01) return parseFloat(n.toFixed(10));
  if (n < 0.1) return parseFloat(n.toFixed(7));
  if (n < 1) return parseFloat(n.toFixed(5));
  if (n >= 1) return parseFloat(n.toFixed(3));

  return 0;
};
