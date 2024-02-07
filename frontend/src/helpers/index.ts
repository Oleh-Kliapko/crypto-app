import { ICryptoAsset } from "@/interfaces";

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

interface SummarizeAssets {
  balance: string;
  coinNumber: number;
  revenue: string;
}

export const summarizeAssets = (arr: ICryptoAsset[]): SummarizeAssets => {
  const balance = arr
    .reduce((acc, v) => acc + v.totalAmount!, 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .toLocaleString();

  const coinNumber = rounding(arr.reduce((acc, v) => acc + v.amount!, 0));

  const revenue = arr
    .reduce((acc, v) => acc + v.totalAmount!, 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .toLocaleString();

  return { balance, coinNumber, revenue };
};

export function generateRandomColors(length: number): string[] {
  const colorsArray: string[] = [];

  for (let i = 0; i < length; i++) {
    const rgbaColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    colorsArray.push(rgbaColor);
  }

  return colorsArray;
}
