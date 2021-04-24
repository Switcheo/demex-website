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
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "typeface-roboto";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const render = rootElement?.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

render(
  <Provider store={store}>
    <PreferenceThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/info">
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
          </Route>
          <Redirect to="/info" />
        </Switch>
      </BrowserRouter>
    </PreferenceThemeProvider>
  </Provider>,
  document.getElementById("root"),
);

if (process.env.NODE_ENV !== "production")
  reportWebVitals(console.log); // eslint-disable-line no-console
