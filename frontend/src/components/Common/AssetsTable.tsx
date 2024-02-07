import { FC } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

import { useCrypto } from "@/hooks";
import { rounding } from "@/helpers";

interface DataType {
  key: string;
  name: string;
  price: number;
  amount: number;
  balance: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Coin",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount, $",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Total balance, $",
    dataIndex: "balance",
    defaultSortOrder: "descend",
    sorter: (a, b) => Number(a.balance) - Number(b.balance),
  },
];

const tableStyles = {
  background: "#b0bbca",
  color: "#000000",
};

const headerStyles = {
  background: "#1890ff",
  color: "#ffffff",
  fontWeight: "bold",
};

export const AssetsTable: FC = () => {
  const { assets } = useCrypto();

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: rounding(asset.price),
    amount: asset.amount,
    balance: asset.totalAmount!.toFixed(2),
  }));

  return <Table pagination={false} columns={columns} dataSource={data} />;
};
