import { createContext, useState, useEffect, FC } from "react";

import { ICrypto, ICryptoAsset } from "@/interfaces";
import { getCoinsById, getAllCoins } from "@/api";
import { percentageDiff } from "@/helpers";

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
        const updatedAssets = await mapAssets(assets);

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

  async function mapAssets(assets: ICryptoAsset[]): Promise<ICryptoAsset[]> {
    const updatedAssets = await Promise.all(
      assets.map(async (asset) => {
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
    const updatedAssets = await mapAssets([...assets, newAsset]);
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
