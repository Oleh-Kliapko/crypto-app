export interface ICrypto {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  redditUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  contractAddress?: string;
  decimals?: number;
  explorers: string[];
}

export interface IMetaCrypto {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ICryptoData {
  result: ICrypto[];
  meta: IMetaCrypto;
}

export interface ICryptoAsset {
  id: string;
  amount: number;
  price: number;
  date: Date | string;
  isGrow: boolean;
  growPercentages: number;
  totalAmount: number;
  totalProfit: number;
  name: string;
}
