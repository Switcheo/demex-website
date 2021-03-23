import "./index.css";
import "typeface-roboto";

import { MainLayout } from "@demex-info/layout";
import { PreferenceThemeProvider } from "@demex-info/components";
import { Provider } from "react-redux";
import React from "react";
import { Typography } from "@material-ui/core";
import { render } from "react-snapshot";
import reportWebVitals from "./reportWebVitals";
import { store } from "@demex-info/store";

render(
	<React.StrictMode>
		<Provider store={store}>
			<PreferenceThemeProvider>
				<MainLayout>
					<Typography variant="body1" color="textSecondary">
            This is some text
					</Typography>
				</MainLayout>
			</PreferenceThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals(console.log); // eslint-disable-line no-console
