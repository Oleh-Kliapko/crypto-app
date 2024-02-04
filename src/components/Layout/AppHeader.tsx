import { FC, useEffect, useState, useRef } from "react";
import { Layout, Select, Space, Button, ConfigProvider } from "antd";

import { useCrypto } from "../../hooks";
import { ICrypto } from "../../interfaces";
import { CoinInfoModal, AddAssetModal } from "../Modals";
import { SelectCoin } from "../Common";

const headerStyle: React.CSSProperties = {
  width: "100%",
  position: "fixed",
  height: "auto",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EFF7FE",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: 10,
};

export const AppHeader: FC = () => {
  const [selected, setSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [coin, setCoin] = useState<ICrypto | undefined>(undefined);
  const { crypto } = useCrypto();
  const selectRef = useRef<any>(null);

  useEffect(() => {
    function handleKeydown(evt: KeyboardEvent) {
      if (evt.key === "/") {
        setSelected((prev) => !prev);
      }

      // if (evt.key === "Escape") {
      //   setSelected(false);
      // }
    }

    if (!isModalOpen) {
      document.addEventListener("keydown", handleKeydown);
    }
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isModalOpen]);

  useEffect(() => {
    if (selected && selectRef.current) {
      selectRef.current.focus();
    }
  }, [selected]);

  const handleSelect = (value: string) => {
    setIsModalOpen(true);
    const coin: ICrypto | undefined = crypto.find((c) => c.id === value);
    setCoin(coin);
  };

  return (
    <Layout.Header style={headerStyle}>
      <SelectCoin
        selectRef={selectRef}
        isOpen={selected}
        onSelect={handleSelect}
        onClick={() => setSelected((prev) => !prev)}
        placeholder='press "/" to open or close'
        someStyles={{ width: "23%" }}
      />

      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Add Asset
      </Button>

      {coin && (
        <CoinInfoModal
          isModalOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          coin={coin}
        />
      )}
      <AddAssetModal
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Layout.Header>
  );
};
