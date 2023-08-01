import * as dotenv from "dotenv";
import { GoogleAnalytics, PreferenceThemeProvider } from "@demex-info/components";
import { MainLayout } from "@demex-info/layout";
import { store } from "@demex-info/store";
import HeroSection from "@demex-info/views/HeroSection/HeroSection";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "typeface-roboto";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { lazy } from "@loadable/component";

dotenv.config();

const rootElement = document.getElementById("root");
const render = rootElement?.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

const DexProperties = lazy(() => import("@demex-info/views/DexProperties/DexProperties"));
const UnleashTrader = lazy(() => import("@demex-info/views/UnleashTrader/UnleashTrader"));
const PoweredBySwitcheo = lazy(() => import("@demex-info/views/PoweredBySwitcheo/PoweredBySwitcheo"));
const TweetSection = lazy(() => import("@demex-info/views/TweetSection/TweetSection"));
const ExchangeComparison = lazy(() => import("@demex-info/views/ExchangeComparison/ExchangeComparison"));
const Features = lazy(() => import("@demex-info/views/Features/Features"));
const YourThoughts = lazy(() => import("@demex-info/views/YourThoughts/YourThoughts"));
const Footer = lazy(() => import("@demex-info/layout/MainLayout/components/Footer"));

render(
  <Provider store={store}>
    <PreferenceThemeProvider>
      <GoogleAnalytics />
      <MainLayout>
        <HeroSection />
        <Suspense fallback={null}>
          <DexProperties />
          <UnleashTrader />
          <PoweredBySwitcheo />
          <Features />
          <TweetSection />
          <ExchangeComparison />
          <YourThoughts />
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
