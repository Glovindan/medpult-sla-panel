import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";

// Рендер приложений
ReactDOM.createRoot(
  document.querySelector("#sla-panel-root") as HTMLElement
).render(<App />);
