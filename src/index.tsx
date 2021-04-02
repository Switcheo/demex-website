import "./index.css";
import "typeface-roboto";

import {
  DexProperties,
  JustGettingStarted,
  MarketsTable,
  MiddleBlackSection,
  PoweredBySwitcheo,
  ReadyToTrade,
} from "@demex-info/views";

import { MainLayout } from "@demex-info/layout";
import { PreferenceThemeProvider } from "@demex-info/components";
import { Provider } from "react-redux";
import React from "react";
import { render } from "react-snapshot";
import reportWebVitals from "./reportWebVitals";
import { store } from "@demex-info/store";

render(
  <Provider store={store}>
    <PreferenceThemeProvider>
      <MainLayout>
        <MarketsTable />
        <DexProperties />
        <PoweredBySwitcheo />
        <MiddleBlackSection />
        <JustGettingStarted />
        <ReadyToTrade />
      </MainLayout>
    </PreferenceThemeProvider>
  </Provider>,
	document.getElementById("root"),
);

reportWebVitals(console.log); // eslint-disable-line no-console
