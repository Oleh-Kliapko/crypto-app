import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useCrypto } from "../../hooks";
import { generateRandomColors } from "../../helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioChart: FC = () => {
  const { assets } = useCrypto();

  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: assets.map((asset) => asset.totalAmount),
        backgroundColor: generateRandomColors(assets.length),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 24,
          boxHeight: 24,
          color: "rgba(27, 64, 91, 0.8)",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  <Doughnut data={data} options={options} />;

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "2rem",
        justifyContent: "center",
        height: 400,
        paddingLeft: 150,
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};
