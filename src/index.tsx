import "./polyfill";

import * as dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "typeface-roboto";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "App";

dotenv.config();

const rootElement = document.getElementById("root");
// eslint-disable-next-line react/no-deprecated
const render = rootElement?.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;


render(
  <App />,
  document.getElementById("root"),
);

if (process.env.NODE_ENV !== "production")
  reportWebVitals(console.log); // eslint-disable-line no-console
