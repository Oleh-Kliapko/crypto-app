import { FC } from "react";
import { Modal, Typography, Divider } from "antd";

import { CoinHeader, ChangeCoinPrices } from "../Common";

import { ICrypto } from "@/interfaces";
import { rounding } from "@/helpers";

interface CoinInfoModalProps {
  coin: ICrypto;
  isModalOpen: boolean;
  onCancel: () => void;
}

export const CoinInfoModal: FC<CoinInfoModalProps> = ({
  coin,
  isModalOpen,
  onCancel,
}) => {
  const { price, priceBtc, marketCap, contractAddress, websiteUrl } = coin;

  const otherCoinData: {
    title: string;
    value?: number | string;
    dimension: string;
    isUrl: boolean;
  }[] = [
    { title: "Price", value: rounding(price), dimension: "$", isUrl: false },
    {
      title: "Price BTC",
      value: rounding(priceBtc),
      dimension: "",
      isUrl: false,
    },
    {
      title: "Market capitalization",
      value: rounding(marketCap).toLocaleString(),
      dimension: "$",
      isUrl: false,
    },
    {
      title: "Contract address",
      value: contractAddress,
      dimension: "",
      isUrl: false,
    },
    { title: "Web-site", value: websiteUrl, dimension: "", isUrl: true },
  ];

  return (
    <Modal open={isModalOpen} footer={null} onCancel={onCancel}>
      <CoinHeader coin={coin} />
      <Divider style={{ margin: 12 }} />
      <ChangeCoinPrices coin={coin} />
      <Divider style={{ margin: 12 }} />
      <Typography.Title level={4}>Other data:</Typography.Title>
      {otherCoinData.map(({ value, title, dimension, isUrl }) => {
        if (value) {
          return (
            <Typography.Paragraph key={title}>
              <Typography.Text strong>{title}: </Typography.Text>
              {isUrl && typeof value === "string" ? (
                <a href={value} target="_blank">
                  {dimension}
                  {value}
                </a>
              ) : (
                <Typography.Text>
                  {dimension}
                  {value}
                </Typography.Text>
              )}
            </Typography.Paragraph>
          );
        }
      })}
    </Modal>
  );
};
