/* eslint-disable semi */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/self-closing-comp */

import React from "react"
import Helmet from "react-helmet"

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID

const GoogleAnalytics: React.FC<{}> = () => {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </script>
    </Helmet>
  );
};

export default GoogleAnalytics
