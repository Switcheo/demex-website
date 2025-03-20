import React, { PropsWithChildren, useEffect } from "react";
import { StatsigClient } from "@statsig/js-client";
import { StatsigAutoCapturePlugin } from "@statsig/web-analytics";
import { StatsigProvider } from "@statsig/react-bindings";
import { useDispatch } from "react-redux";
import { setStatsigClient } from "@demex-info/store/app/actions";
import { useAsyncTask } from "@demex-info/hooks";

const statsigKey =
  process.env.REACT_APP_STATSIG_KEY ?? "";
const statsigUrl = process.env.REACT_APP_STATSIG_URL ?? "";

const statsigClient = new StatsigClient(
  statsigKey,
  {},
  {
    networkConfig: {
      api: statsigUrl,
    },
    plugins: [new StatsigAutoCapturePlugin()],
  },
);

const StatsigConfigProvider = (props: PropsWithChildren<React.ReactNode>) => {
  const { children } = props;
  const dispatch = useDispatch();

  const [runInitStatsigClient] = useAsyncTask("runInitStatsigClient");

  useEffect(() => {
    if (statsigKey) {
      runInitStatsigClient(async () => {
        try {
          await statsigClient.initializeAsync();
          dispatch(setStatsigClient(statsigClient));
        } catch (error) {
          console.error(error);
        }
      });
    }
  }, []);

  return <StatsigProvider client={statsigClient}>{children}</StatsigProvider>;
};

export default StatsigConfigProvider;
