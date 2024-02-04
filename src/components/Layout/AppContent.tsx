import { FC } from "react";
import { Layout } from "antd";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "transparent",
  padding: "1rem",
};

export const AppContent: FC = () => {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
};
