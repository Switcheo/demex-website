import moment from "moment";

export interface LoadingTask {
  [index: string]: moment.Moment;
}
export interface LoadingTasks {
  [index: string]: LoadingTask;
}

export interface LayoutState {
  loadingTasks: LoadingTasks;
  tasksRegistry: any,
}
