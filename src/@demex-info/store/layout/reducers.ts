import moment from "moment";
import { LayoutActionTypes } from "./actions";
import { LayoutState } from "./types";

const initial_state: LayoutState = {
	loadingTasks: {},
	tasksRegistry: {},
};

const reducer = (state: LayoutState = initial_state, actions: any) => {
	let loadingTask = null, taskName;
	switch (actions.type) {
		case LayoutActionTypes.ADD_BACKGROUND_LOADING: {
			loadingTask = state.loadingTasks[actions.name] || {};
			loadingTask[actions.uuid] = moment();
			state.tasksRegistry[actions.uuid] = actions.name;
			return {
				...state,
				loadingTasks: {
					...state.loadingTasks,
					[actions.name]: loadingTask,
				},
				tasksRegistry: {
					...state.tasksRegistry,
				},
			};
		}
		case LayoutActionTypes.REMOVE_BACKGROUND_LOADING: {
			taskName = state.tasksRegistry[actions.uuid];
			if (!taskName)
				return state;
			loadingTask = state.loadingTasks[taskName];
			if (!loadingTask || !loadingTask[actions.uuid])
				return state;

			delete loadingTask[actions.uuid];
			if (!Object.keys(loadingTask).length)
				delete state.loadingTasks[taskName];
			delete state.tasksRegistry[actions.uuid];
			return {
				...state,
				loadingTasks: {
					...state.loadingTasks,
				},
				tasksRegistry: {
					...state.tasksRegistry,
				},
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
