import { FC } from "react";
import { Typography, Tag, List, ConfigProvider, Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import { ICryptoAsset } from "../../interfaces";
import { capitalize } from "../../helpers";

interface AssetCardProps {
  asset: ICryptoAsset;
  someStyles?: object;
}

export interface IAssetCard {
  title: string;
  value: number;
  dimension: string | null;
}

export const AssetCard: FC<AssetCardProps> = ({
  asset,
  someStyles = {
    marginBottom: "1rem",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
  },
}) => {
  const { id, growPercentages, isGrow, totalAmount, totalProfit, amount } =
    asset;

  const assetCard: IAssetCard[] = [
    { title: "Asset Amount", value: amount, dimension: null },
    {
      title: "Total Amount",
      value: parseFloat(totalAmount!.toFixed(2)),
      dimension: "$",
    },
    {
      title: "Total Profit",
      value: parseFloat(totalProfit!.toFixed(2)),
      dimension: "$",
    },
  ];
  return (
    <Card style={someStyles}>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 20,
            colorTextDescription: "rgba(27, 64, 91, 0.8)",
          },
        }}
      >
        <Statistic
          title={capitalize(id)}
          value={growPercentages?.toFixed(2)}
          precision={2}
          valueStyle={{ color: isGrow ? "#3f8600" : "#cf1322" }}
          prefix={isGrow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="%"
        />
      </ConfigProvider>
      <List
        size="small"
        dataSource={assetCard}
        renderItem={(item) => {
          const { title, value, dimension } = item;

          return (
            <List.Item>
              <Typography.Text>
                {title}
                {dimension ? `, ${dimension}` : ""}
              </Typography.Text>
              {title === "Total Profit" && (
                <Tag color={isGrow ? "green" : "red"} style={{ margin: 0 }}>
                  {value.toLocaleString()}
                </Tag>
              )}
              {title !== "Total Profit" && (
                <Typography.Text>{value.toLocaleString()}</Typography.Text>
              )}
            </List.Item>
          );
        }}
      />
    </Card>
  );
};
