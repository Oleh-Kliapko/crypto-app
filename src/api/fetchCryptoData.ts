import axios from "axios";

const COIN_STATS_KEY = import.meta.env.VITE_COIN_STATS_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAllCoins = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins`, {
      headers: {
        accept: "application/json",
        "X-API-KEY": COIN_STATS_KEY,
      },
    });

    return data;
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};

const getCoinsById = async (id: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/${id}`, {
      headers: {
        accept: "application/json",
        "X-API-KEY": COIN_STATS_KEY,
      },
    });

    return data;
  } catch (error: any) {
    console.log("Error: ", error.message);
  }
};

export { getAllCoins, getCoinsById };
