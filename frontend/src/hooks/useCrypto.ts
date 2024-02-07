import { useContext } from "react";

import { CryptoContext } from "@/context";

export function useCrypto() {
  return useContext(CryptoContext);
}
