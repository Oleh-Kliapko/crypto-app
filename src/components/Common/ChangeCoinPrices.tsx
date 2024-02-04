import { FC, Fragment } from "react";
import { Typography, Tag } from "antd";

import { ICrypto } from "../../interfaces";

interface ChangeCoinPricesProps {
  coin: ICrypto;
  someStyles?: object;
}

export const ChangeCoinPrices: FC<ChangeCoinPricesProps> = ({
  coin,
  someStyles,
}) => {
  const { priceChange1h, priceChange1d, priceChange1w } = coin;

  const priceChangeData: { title: string; changed: number }[] = [
    { title: "1 hour", changed: priceChange1h },
    { title: "1 day", changed: priceChange1d },
    { title: "1 week", changed: priceChange1w },
  ];

  return (
    <Typography.Paragraph style={someStyles}>
      <Typography.Title level={5}>The price changed during:</Typography.Title>
      {priceChangeData.map(({ changed, title }) => {
        return (
          <Fragment key={title}>
            <Typography.Text style={{ fontSize: 14 }}>{title} </Typography.Text>
            <Tag
              color={changed > 0 ? "green" : "red"}
              style={{ marginRight: 18 }}
            >
              {changed}%
            </Tag>
          </Fragment>
        );
      })}
    </Typography.Paragraph>
  );
};
