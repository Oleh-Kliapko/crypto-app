import { FC } from "react";
import { Skeleton } from "antd";

interface LoaderProps {
  count: number;
}

const style: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "rgba(0,0,0,0.1)",
};

export const Loader: FC<LoaderProps> = ({ count }) => {
  return (
    <div style={style}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} active avatar />
      ))}
    </div>
  );
};
