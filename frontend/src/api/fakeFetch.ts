import { cryptoData, cryptoAssets } from "../data";
import { ICryptoAsset, ICryptoData } from "../interfaces";

export const fakeFetchCryptoData = (): Promise<ICryptoData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cryptoData), 1);
  });
};

export const fakeFetchAssets = (): Promise<ICryptoAsset[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cryptoAssets), 1);
  });
};
