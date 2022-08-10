import { PreferenceThemeProvider } from "@demex-info/components";
import { MainLayout } from "@demex-info/layout";
import { store } from "@demex-info/store";
import HeroSection from "@demex-info/views/HeroSection/HeroSection";
import MarketsTable from "@demex-info/views/MarketsTable/MarketsTable";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "typeface-roboto";
import "./index.css";
import "./app.css";
import reportWebVitals from "./reportWebVitals";
import { lazy } from "@loadable/component";

const rootElement = document.getElementById("root");
const render = rootElement?.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

const DexProperties = lazy(() => import("@demex-info/views/DexProperties/DexProperties"));
const PoweredBySwitcheo = lazy(() => import("@demex-info/views/PoweredBySwitcheo/PoweredBySwitcheo"));
const MiddleBlackSection = lazy(() => import("@demex-info/views/MiddleBlackSection/MiddleBlackSection"));
const ExchangeComparison = lazy(() => import("@demex-info/views/ExchangeComparison/ExchangeComparison"));
const JustGettingStarted = lazy(() => import("@demex-info/views/JustGettingStarted/JustGettingStarted"));
const ReadyToTrade = lazy(() => import("@demex-info/views/ReadyToTrade/ReadyToTrade"));
const Footer = lazy(() => import("@demex-info/layout/MainLayout/components/Footer"));

render(
  <Provider store={store}>
    <PreferenceThemeProvider>
      <MainLayout>
        <HeroSection />
        <Suspense fallback={null}>
          <MarketsTable />
          <DexProperties />
          <PoweredBySwitcheo />
          <MiddleBlackSection />
          <ExchangeComparison />
          <JustGettingStarted />
          <ReadyToTrade />
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </Suspense>
      </MainLayout>
    </PreferenceThemeProvider>
  </Provider>,
  document.getElementById("root"),
);

if (process.env.NODE_ENV !== "production")
  reportWebVitals(console.log); // eslint-disable-line no-console
