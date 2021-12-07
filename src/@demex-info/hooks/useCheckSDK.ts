import { RootState } from "@demex-info/store/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type CheckSDKStatus = boolean;
export type CheckSDKSetter = Dispatch<SetStateAction<boolean>>;

export default (): [CheckSDKStatus, CheckSDKSetter] => {
  const sdk = useSelector((state: RootState) => state.app.sdk);
  const [runQuery, setRunQuery] = useState<boolean>(false);

  useEffect(() => {
    if (sdk) {
      setRunQuery(true);
    } else {
      setRunQuery(false);
    }
    return () => {};
  }, [sdk]);

  return [runQuery, setRunQuery];
};
