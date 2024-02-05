import { FC } from "react";

import { AppLayout } from "./components/Layout";
import { CryptoContextProvider } from "./context";

const App: FC = () => {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
};

export default App;
