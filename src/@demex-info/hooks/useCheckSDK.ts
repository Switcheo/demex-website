import { RootState } from "@demex-info/store/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

let initInterval: any;

export type CheckSDKStatus = boolean;
export type CheckSDKSetter = Dispatch<SetStateAction<boolean>>;

export default (): [CheckSDKStatus, CheckSDKSetter] => {
  const sdk = useSelector((state: RootState) => state.app.sdk);
  const [runQuery, setRunQuery] = useState<boolean>(false);

  useEffect(() => {
    // Start interval to check for initialized sdk
    // Then start query when initialized
    initInterval = setInterval(() => {
      if (sdk) {
        setRunQuery(true);
        clearInterval(initInterval);
      }
    }, 200);
  }, [sdk]);

  return [runQuery, setRunQuery];
};
