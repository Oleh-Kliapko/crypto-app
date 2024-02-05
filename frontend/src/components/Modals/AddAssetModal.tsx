import { FC, useEffect, useRef, useState } from "react";
import {
  Drawer,
  Form,
  InputNumber,
  Button,
  Divider,
  DatePicker,
  Result,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { SmileOutlined } from "@ant-design/icons";

import { SelectCoin, CoinHeader, ChangeCoinPrices } from "../Common";
import { ICrypto, ICryptoAsset } from "../../interfaces";
import { useCrypto } from "../../hooks";
import { rounding } from "../../helpers";

import { getCoinsById } from "../../api";

interface AddAssetProps {
  isDrawerOpen: boolean;
  onClose: () => void;
}

type FieldType = {
  amount: number;
  price: number;
  date: Date;
  total: number;
};

const validateMessages = {
  required: "${label} is required",
  types: {
    number: "${label} is invalid number",
  },
  number: {
    range: "${label} must be more than ${min}",
  },
};

export const AddAssetModal: FC<AddAssetProps> = ({ isDrawerOpen, onClose }) => {
  const [coin, setCoin] = useState<ICrypto | undefined>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [form] = useForm();
  const { crypto, addAsset } = useCrypto();
  const assetRef = useRef<ICryptoAsset>();

  const handleSelect = (value: string) => {
    setIsSubmitted(false);
    // const coin: ICrypto = await getCoinsById(asset.id);
    const coin: ICrypto | undefined = crypto.find((c) => c.id === value);
    setCoin(coin);

    if (coin) {
      const { price } = coin;
      form.setFieldsValue({ price: rounding(price) });
    }
  };

  const handleOnClose = () => {
    onClose();
    setCoin(undefined);
  };

  const handleAmountChange = (value: number | null) => {
    if (coin && value) {
      form.setFieldsValue({
        total: (value * coin.price).toLocaleString(),
      });
    }
  };

  const handleFinish = (values: FieldType) => {
    setIsSubmitted(true);
    form.resetFields();

    const newAsset: ICryptoAsset = {
      id: coin!.id,
      amount: values.amount,
      price: values.price,
      date: values.date || new Date(),
    };

    assetRef.current = { ...newAsset, totalAmount: values.total };
    if (addAsset) {
      addAsset(newAsset);
    }
  };

  return (
    <Drawer
      title="Add Asset"
      open={isDrawerOpen}
      onClose={handleOnClose}
      destroyOnClose
      styles={{
        wrapper: {
          width: 480,
        },
      }}
    >
      <SelectCoin
        onSelect={handleSelect}
        placeholder="Choose your coin ..."
        someStyles={{ width: "100%", marginBottom: 24 }}
      />
      <Divider style={{ marginTop: 0, marginBottom: 12 }} />
      {coin && !isSubmitted && (
        <>
          <CoinHeader coin={coin} someStyles={{ marginBottom: 20 }} />
          <ChangeCoinPrices
            coin={coin}
            someStyles={{ marginBottom: 30, marginLeft: 60 }}
          />
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            style={{ width: "100%" }}
            onFinish={handleFinish}
            validateMessages={validateMessages}
            form={form}
          >
            <Form.Item<FieldType>
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  type: "number",
                  min: 0,
                },
              ]}
              tooltip="How many coins do you want to buy? Required"
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter coin amount..."
                onChange={handleAmountChange}
              />
            </Form.Item>
            <Form.Item<FieldType> label="Price, $" name="price">
              <InputNumber disabled style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item<FieldType> label="Date" name="date">
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item<FieldType> label="Total cost, $" name="total">
              <InputNumber disabled style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Buy asset
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {isSubmitted && (
        <Result
          icon={<SmileOutlined />}
          title="Great, you have added new asset!"
          subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} by price $${assetRef.current?.price}. Total cost - $${assetRef.current?.totalAmount}`}
          extra={
            <Button
              type="primary"
              onClick={() => {
                setIsSubmitted(false);
                setCoin(undefined);
              }}
            >
              Close
            </Button>
          }
        />
      )}
    </Drawer>
  );
};
