import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { uuidv4 } from "@demex-info/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export type ErrorHandler = (error: any) => (() => void) //eslint-disable-line no-unused-vars

export type AsyncTaskTask<T> = () => Promise<T>
export type AsyncTaskErrorHandler = (error: Error) => Promise<boolean | undefined | void> //eslint-disable-line no-unused-vars
export type FinalHandler = (() => void) | null

export type AsyncTaskRunner<T> = (task: AsyncTaskTask<T>, errorHandler?: AsyncTaskErrorHandler, finalHandler?: FinalHandler) => Promise<void> //eslint-disable-line no-unused-vars
export type AsyncTaskLoading = boolean
export type AsyncTaskError = Error | null
export type AsyncTaskClearError = () => void

export type AsyncTaskOutput<T> = [
  AsyncTaskRunner<T>,
  AsyncTaskLoading,
  AsyncTaskError,
  AsyncTaskClearError,
]

const parseError = (original: Error): Error => {
  const error = original;
  return error;
};

export default <T>(taskname: string, onError?: (e: Error) => void): AsyncTaskOutput<T> => { //eslint-disable-line no-unused-vars
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const loadingTasks = useSelector((store: RootState) => store.layout.loadingTasks);

  const cleanup = () => {
    setError(null);
  };

  const asyncTaskRunner = async (task: AsyncTaskTask<T>, errorHandler?: AsyncTaskErrorHandler, finalHandler?: FinalHandler): Promise<void> => {
    if (typeof task !== "function") {
      throw new Error("async task not a function");
    }
    if (typeof cleanup === "function") cleanup();

    const taskUuid = uuidv4();

    dispatch(actions.Layout.addBackgroundLoading(taskname, taskUuid));
    try {
      await task();
    } catch (rawError) {
      if (errorHandler) {
        const handleErrorResult = await errorHandler(rawError);
        if (handleErrorResult === false) {
          return;
        }
      }

      const error = parseError(rawError);

      if (onError) {
        onError(rawError);
        return;
      }

      setError(error);
    } finally {
      dispatch(actions.Layout.removeBackgroundLoading(taskUuid));
      if (finalHandler) {
        finalHandler();
      }
    }
  };

  const clearError = () => {
    setError(null);
  };

  const loadingState = !!loadingTasks[taskname];
  return [asyncTaskRunner, loadingState, error, clearError];
};
