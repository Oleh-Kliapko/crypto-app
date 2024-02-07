import { FC } from "react";
import { Select, Space, ConfigProvider } from "antd";

import { useCrypto } from "@/hooks";
import { ICrypto } from "@/interfaces";

interface SelectCoinProps {
  selectRef?: React.RefObject<any> | undefined;
  isOpen?: boolean;
  onSelect: (value: string) => void;
  onClick?: () => void;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  placeholder?: string;
  someStyles?: object;
}

export const SelectCoin: FC<SelectCoinProps> = ({
  selectRef,
  isOpen,
  onSelect,
  onClick,
  showSearch,
  onSearch,
  placeholder,
  someStyles,
}) => {
  const { crypto } = useCrypto();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#D9E6F6",
          colorText: "rgba(27, 64, 91, 0.8)",
          colorTextPlaceholder: "rgba(27, 64, 91, 0.7)",
        },
      }}
    >
      <Select
        ref={selectRef}
        style={someStyles}
        open={isOpen}
        onSelect={onSelect}
        onClick={onClick}
        showSearch={showSearch}
        onSearch={onSearch}
        placeholder={placeholder}
        optionLabelProp="label"
        options={crypto.map((coin: ICrypto) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        optionRender={(crypto) => (
          <Space style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src={crypto.data.icon}
              alt={crypto.data.label}
              aria-label={crypto.data.label}
              width="16"
              height="16"
            />
            {crypto.data.label}
          </Space>
        )}
      />
    </ConfigProvider>
  );
};
