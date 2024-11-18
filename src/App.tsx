import { GoogleAnalytics, PreferenceThemeProvider } from "@demex-info/components";
import { MainLayout } from "@demex-info/layout";
import { Footer } from "@demex-info/layout/MainLayout/components";
import { store } from "@demex-info/store";
import { DemexBFT, ExchangeComparison, HeroSection, Roadmap, Videos, Features } from "@demex-info/views";
import { Hidden } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <PreferenceThemeProvider>
        <GoogleAnalytics />
          <MainLayout>
            <HeroSection />
            <Features />
            <Videos />
            <Roadmap />
            <Hidden smDown>
              <DemexBFT />
            </Hidden>
            <ExchangeComparison />
            <Footer />
          </MainLayout>
      </PreferenceThemeProvider>
    </Provider>
  );
};

export default App;
