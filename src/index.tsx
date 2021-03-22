import { MainLayout } from "@demex-info/layout";
import React from "react";
import { render } from "react-snapshot";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

render(
  <React.StrictMode>
    <MainLayout>

    </MainLayout>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
