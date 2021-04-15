import { LoadingTasks } from "@demex-info/store/layout/types";
import { RootState } from "@demex-info/store/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default (...tasks: string[]) => {
  const loadingTasks = useSelector<RootState, LoadingTasks>((store) => store.layout.loadingTasks);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    for (const key of tasks) {
      if (loadingTasks[key]) {
        return setLoading(true);
      }
    }
    return setLoading(false);
  }, [loadingTasks, tasks]);

  return [loading];
};
