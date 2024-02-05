import { FC } from "react";
import { Layout } from "antd";

import { useCrypto } from "../../hooks";
import { AssetCard } from "../Common";

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
