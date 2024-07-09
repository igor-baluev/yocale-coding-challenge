import React from "react";
import { Container, createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import App from "./app/app";

const root = createRoot(document.getElementById("root") as Container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
