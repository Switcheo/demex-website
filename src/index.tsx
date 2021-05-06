import { PreferenceThemeProvider } from "@demex-info/components";
import { MainLayout } from "@demex-info/layout";
import { store } from "@demex-info/store";
import HeroSection from "@demex-info/views/HeroSection/HeroSection";
import MarketsTable from "@demex-info/views/MarketsTable/MarketsTable";
import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "typeface-roboto";
import "./index.css";
import "./app.css";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const render = rootElement?.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

const DexProperties = Loadable({
  loader: () => import("@demex-info/views/DexProperties/DexProperties"),
  loading() {
    return null;
  },
  delay: 300,
});
const PoweredBySwitcheo = Loadable({
  loader: () => import("@demex-info/views/PoweredBySwitcheo/PoweredBySwitcheo"),
  loading() {
    return null;
  },
  delay: 600,
});
const MiddleBlackSection = Loadable({
  loader: () => import("@demex-info/views/MiddleBlackSection/MiddleBlackSection"),
  loading() {
    return null;
  },
  delay: 900,
});
const ExchangeComparison = Loadable({
  loader: () => import("@demex-info/views/ExchangeComparison/ExchangeComparison"),
  loading() {
    return null;
  },
  delay: 1200,
});
const JustGettingStarted = Loadable({
  loader: () => import("@demex-info/views/JustGettingStarted/JustGettingStarted"),
  loading() {
    return null;
  },
  delay: 1500,
});
const ReadyToTrade = Loadable({
  loader: () => import("@demex-info/views/ReadyToTrade/ReadyToTrade"),
  loading() {
    return null;
  },
  delay: 1800,
});

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

if (process.env.NODE_ENV !== "production")
  reportWebVitals(console.log); // eslint-disable-line no-console
