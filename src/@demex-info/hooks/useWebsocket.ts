import { RootState } from "@demex-info/store/types";
import { WSConnector } from "carbon-js-sdk";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type WsResponse = [ws: WSConnector | undefined];

export default (): WsResponse => {
  const network = useSelector((store: RootState) => store.app.network);
  const sdk = useSelector((store: RootState) => store.app.sdk);
  const [ws, setWs] = useState<WSConnector | undefined>(undefined);

  const connectWs = (ws: WSConnector) => {
    const runConnect = async () => {
      try {
        await ws.connect();
        return ws;
      } catch (err) {
        console.error(err);
      }
    };
    runConnect();
  };

  // const disconnectWs = (ws: WSConnector) => {
  //   const runDisconnect = async () => {
  //     try {
  //       await ws.disconnect();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   runDisconnect();
  // };

  useEffect(() => {
    if (sdk) {
      const wsConnector = new WSConnector({
        endpoint: sdk.networkConfig.wsUrl,
        timeoutConnect: 5000,
        disableHeartbeat: false,
      });
      connectWs(wsConnector);
      setWs(wsConnector);
      return () => {
        if (ws) {
          // disconnectWs(ws);
        }
      };
    }
    return () => { };
  }, [sdk, network]);

  return [ws];
};

