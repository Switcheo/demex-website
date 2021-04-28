import { PreferenceThemeProvider } from "@demex-info/components";
import { MainLayout } from "@demex-info/layout";
import { store } from "@demex-info/store";
import HeroSection from "@demex-info/views/HeroSection/HeroSection";
import MarketsTable from "@demex-info/views/MarketsTable/MarketsTable";
import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "typeface-roboto";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const render = rootElement?.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

const DexProperties = Loadable({
  loader: () => import("@demex-info/views/DexProperties/DexProperties"),
  loading() {
    return null;
  },
  delay: window.innerWidth <= 960 ? 500 : 300,
});
const PoweredBySwitcheo = Loadable({
  loader: () => import("@demex-info/views/PoweredBySwitcheo/PoweredBySwitcheo"),
  loading() {
    return null;
  },
  delay: window.innerWidth <= 960 ? 1000 : 600,
});
const MiddleBlackSection = Loadable({
  loader: () => import("@demex-info/views/MiddleBlackSection/MiddleBlackSection"),
  loading() {
    return null;
  },
  delay: window.innerWidth <= 960 ? 1500 : 900,
});
const ExchangeComparison = Loadable({
  loader: () => import("@demex-info/views/ExchangeComparison/ExchangeComparison"),
  loading() {
    return null;
  },
  delay: window.innerWidth <= 960 ? 2000 : 1200,
});
const JustGettingStarted = Loadable({
  loader: () => import("@demex-info/views/JustGettingStarted/JustGettingStarted"),
  loading() {
    return null;
  },
  delay: window.innerWidth <= 960 ? 2500 : 1500,
});
const ReadyToTrade = Loadable({
  loader: () => import("@demex-info/views/ReadyToTrade/ReadyToTrade"),
  loading() {
    return null;
  },
  delay: window.innerWidth <= 960 ? 3000 : 1500,
});


render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
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
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

if (process.env.NODE_ENV !== "production")
  reportWebVitals(console.log); // eslint-disable-line no-console
