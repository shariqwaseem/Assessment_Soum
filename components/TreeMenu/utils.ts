interface AddIdAction {
	type: "ADD_ID";
	payload: string | number | number[];
}

interface RemoveIdAction {
	type: "REMOVE_ID";
	payload: string | number | number[];
}

export type Action = AddIdAction | RemoveIdAction;

export type State = Array<string | number | number[]>;
export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "ADD_ID":
			return [...state, action.payload];
		case "REMOVE_ID":
			return state.filter((id) => id !== action.payload);
		default:
			return state;
	}
};
