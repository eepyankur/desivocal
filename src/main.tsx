import React from "react";
import ReactDOM from "react-dom/client";
import { Providers } from "@/services/Providers.tsx";
import App from "./App.tsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
    <Analytics />
  </React.StrictMode>,
);
