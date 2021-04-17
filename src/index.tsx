import { PreferenceThemeProvider } from "@demex-info/components";
import { MainLayout } from "@demex-info/layout";
import { store } from "@demex-info/store";
import {
  DexProperties,
  ExchangeComparison,
  HeroSection,
  JustGettingStarted,
  MarketsTable,
  MiddleBlackSection,
  PoweredBySwitcheo,
  ReadyToTrade,
} from "@demex-info/views";
import React from "react";
import { Provider } from "react-redux";
import { render } from "react-snapshot";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "typeface-roboto";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

render(
  <Provider store={store}>
    <PreferenceThemeProvider>
      <MainLayout>
        <HeroSection />
        <MarketsTable />
        <DexProperties />
        <PoweredBySwitcheo />
        <MiddleBlackSection />
        <ExchangeComparison />
        <JustGettingStarted />
        <ReadyToTrade />
      </MainLayout>
    </PreferenceThemeProvider>
  </Provider>,
  document.getElementById("root"),
);

reportWebVitals(console.log); // eslint-disable-line no-console
