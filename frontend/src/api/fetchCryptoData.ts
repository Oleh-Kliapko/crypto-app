import axios, { AxiosResponse } from "axios";
import { ICrypto, ICryptoData } from "@/interfaces";

const COIN_STATS_KEY = import.meta.env.VITE_COIN_STATS_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAllCoins = async (): Promise<ICryptoData> => {
  try {
    const response: AxiosResponse<ICryptoData> = await axios.get(
      `${BASE_URL}/coins?limit=1000`,
      {
        headers: {
          accept: "application/json",
          "X-API-KEY": COIN_STATS_KEY,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("Error: ", error.message);
    throw error;
  }
};

const getCoinsById = async (id: string): Promise<ICrypto> => {
  try {
    const response: AxiosResponse<ICrypto> = await axios.get(
      `${BASE_URL}/coins/${id}`,
      {
        headers: {
          accept: "application/json",
          "X-API-KEY": COIN_STATS_KEY,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("Error: ", error.message);
    throw error;
  }
};

export { getAllCoins, getCoinsById };
