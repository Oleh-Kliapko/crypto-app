import { FC } from "react";
import { Layout, Result } from "antd";

import { AppHeader, AppSider, AppContent } from ".";

import { Loader } from "../Loaders";
import { useCrypto } from "../../hooks";

const notificationStyle: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const AppLayout: FC = () => {
  const { isLoading, error, assets } = useCrypto();

  if (isLoading) return <Loader count={5} />;
  if (error)
    return (
      <div style={notificationStyle}>
        <Result
          status="500"
          title="Something went wrong!"
          subTitle="Please reload the page"
        />
      </div>
    );

  return (
    <Layout>
      <AppHeader />
      {assets.length !== 0 ? (
        <Layout style={{ marginTop: 60 }}>
          <AppSider />
          <AppContent />
        </Layout>
      ) : (
        <div style={notificationStyle}>
          <Result
            status="warning"
            title="Sorry, you have no assets!"
            subTitle="Please add any coin in your portfolio using the button above"
          />
        </div>
      )}
    </Layout>
  );
};
