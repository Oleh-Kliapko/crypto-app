import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";

const root = document.getElementById("root");

createRoot(root as HTMLDivElement).render(<App />);
