import { createContext, useState, useEffect, FC } from "react";

import { ICrypto, ICryptoAsset } from "../interfaces";
import { getCoinsById, getAllCoins } from "../api";
// import { fakeFetchAssets, fakeFetchCryptoData } from "../api/fakeFetch";
import { percentageDiff } from "../helpers";

interface ICryptoContext {
  crypto: ICrypto[];
  assets: ICryptoAsset[];
  isLoading: boolean;
  error: any;
  addAsset?: (newAsset: ICryptoAsset) => void;
}

export const CryptoContext = createContext<ICryptoContext>({
  crypto: [],
  assets: [],
  isLoading: false,
  error: null,
});

export const CryptoContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [assets, setAssets] = useState<ICryptoAsset[]>([]);
  const [crypto, setCrypto] = useState<ICrypto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function preload() {
      setIsLoading(true);
      try {
        const { result } = await getAllCoins();
        // const { result } = await fakeFetchCryptoData();
        // const assets = await fakeFetchAssets();

        const updatedAssets = await mapAssets(
          assets
          // result
        );

        setCrypto(result);
        setAssets(updatedAssets);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    preload();
  }, []);

  async function mapAssets(
    assets: ICryptoAsset[]
    // result: ICrypto[]
  ): Promise<ICryptoAsset[]> {
    const updatedAssets = await Promise.all(
      assets.map(async (asset) => {
        // const coin: ICrypto | undefined = result.find((c) => c.id === asset.id);
        const coin: ICrypto | undefined = await getCoinsById(asset.id);

        let additionalAssetsInfo;
        if (coin) {
          additionalAssetsInfo = {
            isGrow: asset.price < coin.price,
            growPercentages: percentageDiff(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * (coin.price - asset.price),
          };
        } else {
          additionalAssetsInfo = {
            isGrow: false,
            growPercentages: 0,
            totalAmount: 0,
            totalProfit: 0,
          };
        }

        return {
          ...asset,
          ...additionalAssetsInfo,
        };
      })
    );

    return updatedAssets;
  }

  async function addAsset(newAsset: ICryptoAsset) {
    const updatedAssets = await mapAssets(
      [...assets, newAsset]
      // crypto
    );
    setAssets(updatedAssets);
  }

  return (
    <CryptoContext.Provider
      value={{ isLoading, error, crypto, assets, addAsset }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
