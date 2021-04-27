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
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "typeface-roboto";
// import "./index.css";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const render = rootElement?.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

const DexProperties = Loadable({
  loader: () => import("@demex-info/views/DexProperties/DexProperties"),
  loading() {
    return null;
  },
  delay: 1000,
});
const PoweredBySwitcheo = Loadable({
  loader: () => import("@demex-info/views/PoweredBySwitcheo/PoweredBySwitcheo"),
  loading() {
    return null;
  },
  delay: 1400,
});
const MiddleBlackSection = Loadable({
  loader: () => import("@demex-info/views/MiddleBlackSection/MiddleBlackSection"),
  loading() {
    return null;
  },
  delay: 1800,
});
const ExchangeComparison = Loadable({
  loader: () => import("@demex-info/views/ExchangeComparison/ExchangeComparison"),
  loading() {
    return null;
  },
  delay: 2200,
});
const JustGettingStarted = Loadable({
  loader: () => import("@demex-info/views/JustGettingStarted/JustGettingStarted"),
  loading() {
    return null;
  },
  delay: 2600,
});
const ReadyToTrade = Loadable({
  loader: () => import("@demex-info/views/ReadyToTrade/ReadyToTrade"),
  loading() {
    return null;
  },
  delay: 3000,
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
