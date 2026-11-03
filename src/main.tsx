import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Resources from "./Resources";
import { RESOURCES_PATH } from "./guides";
import "./styles.css";

const path = window.location.pathname;
const isResources = path === RESOURCES_PATH || path.startsWith(`${RESOURCES_PATH}/`);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isResources ? <Resources path={path} /> : <App />}</React.StrictMode>
);
