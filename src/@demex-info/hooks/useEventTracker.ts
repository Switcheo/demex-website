import { RootState } from "@demex-info/store/types";
import { cleanUndefined, EventAction } from "@demex-info/utils";
import { TypeUtils } from "carbon-js-sdk";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const useEventTracker = () => {
  const statsigClient = useSelector(
    (store: RootState) => store.app.statsigClient,
  );

  const sendStatsigEvent = useCallback(
    (
      eventAction: EventAction,
      args?: TypeUtils.SimpleMap<string>,
      eventValue?: number,
    ) => {

      if (statsigClient) {
        statsigClient.logEvent(eventAction, eventValue, { ...args });
      }
    },
    [statsigClient],
  );

  const sendGaEvent = useCallback((eventAction: EventAction, args?: TypeUtils.SimpleMap<string>) => {
    const data = cleanUndefined({
      event: eventAction,
      ...args,
    });
  
    if (typeof window !== "undefined") {
      (window as any).logGoogleAnalytics?.(data);
      (window as any).dataLayer?.push(data);
    }
  }, []);

  return { sendStatsigEvent, sendGaEvent };
};

export default useEventTracker;
