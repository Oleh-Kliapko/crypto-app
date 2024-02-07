import { FC } from "react";
import { Layout } from "antd";

import { AssetCard } from "../Common";

import { useCrypto } from "@/hooks";

export const AppSider: FC = () => {
  const { assets } = useCrypto();

  return (
    <Layout.Sider
      width="25%"
      style={{
        padding: "1rem",
        backgroundColor: "transparent",
      }}
    >
      {assets &&
        assets.map((asset) => <AssetCard asset={asset} key={asset.id} />)}
    </Layout.Sider>
  );
};
