import "./index.css";
import "typeface-roboto";

import { DexProperties, PoweredBySwitcheo, ReadyToTrade } from "@demex-info/views";

import { MainLayout } from "@demex-info/layout";
import { PreferenceThemeProvider } from "@demex-info/components";
import { Provider } from "react-redux";
import React from "react";
import { render } from "react-snapshot";
import reportWebVitals from "./reportWebVitals";
import { store } from "@demex-info/store";

render(
	<React.StrictMode>
		<Provider store={store}>
			<PreferenceThemeProvider>
				<MainLayout>
          <DexProperties />
          <PoweredBySwitcheo />
          <ReadyToTrade />
				</MainLayout>
			</PreferenceThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

reportWebVitals(console.log); // eslint-disable-line no-console
