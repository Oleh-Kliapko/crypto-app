import { FC } from "react";
import { Divider, Layout, Typography } from "antd";

import { AssetsTable, PortfolioChart } from "../Common";
import { useCrypto } from "../../hooks";
import { summarizeAssets } from "../../helpers";

const contentStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 60px)",
  backgroundColor: "transparent",
  padding: "1rem",
  paddingLeft: "2rem",
};

export const AppContent: FC = () => {
  const { assets } = useCrypto();

  const { balance } = summarizeAssets(assets);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title
        level={3}
        style={{ textAlign: "right", color: "rgba(27, 64, 91, 0.8)" }}
      >
        Portfolio: ${balance}
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
};
