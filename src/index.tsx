import { Typography } from "@material-ui/core"
import { PreferenceThemeProvider } from "@demex-info/components"
import { MainLayout } from "@demex-info/layout";
import React from "react";
import { render } from "react-snapshot";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

render(
  <React.StrictMode>
    <PreferenceThemeProvider>
      <MainLayout>
        <Typography variant="body1" color="textSecondary">
          This is some text
        </Typography>
      </MainLayout>
    </PreferenceThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
