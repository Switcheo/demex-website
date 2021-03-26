export const LayoutActionTypes = {
	ADD_BACKGROUND_LOADING: "ADD_BACKGROUND_LOADING",
	REMOVE_BACKGROUND_LOADING: "REMOVE_BACKGROUND_LOADING",
};

export function addBackgroundLoading(name: string, uuid: string) {
	return {
		type: LayoutActionTypes.ADD_BACKGROUND_LOADING,
		name, uuid,
	};
}

export function removeBackgroundLoading(uuid: string) {
	return {
		type: LayoutActionTypes.REMOVE_BACKGROUND_LOADING,
		uuid,
	};
}
