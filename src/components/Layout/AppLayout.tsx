import { FC, useContext } from "react";
import { Layout } from "antd";

import { AppHeader, AppSider, AppContent } from ".";
import { Loader } from "../Loaders";
import { CryptoContext } from "../../context";

export const AppLayout: FC = () => {
  const { isLoading } = useContext(CryptoContext);

  if (isLoading) return <Loader count={5} />;

  return (
    <Layout>
      <AppHeader />
      <Layout style={{ marginTop: 60 }}>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};
