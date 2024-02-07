import { FC } from "react";
import { Flex, Typography, Image } from "antd";

import { ICrypto } from "@/interfaces";

interface CoinHeaderProps {
  coin: ICrypto;
  someStyles?: object;
}

export const CoinHeader: FC<CoinHeaderProps> = ({ coin, someStyles }) => {
  const { icon, name, symbol } = coin;

  return (
    <Flex align="center" style={someStyles}>
      <Image src={icon} alt={name} style={{ width: 40, marginRight: 20 }} />
      {symbol && (
        <Typography.Title level={3} style={{ margin: 0, marginRight: 10 }}>
          [{symbol}]
        </Typography.Title>
      )}
      <Typography.Title level={3} style={{ margin: 0 }}>
        {name}
      </Typography.Title>
    </Flex>
  );
};
