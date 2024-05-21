import React, {useCallback, useReducer} from "react";
import {FlatList, View, Text} from "react-native";
import {StyleSheet} from "react-native";
import {BlueprintObjType, RandomEntry} from "../../types/Entries";
import MenuItem from "./MenuItem";
import {
	Action,
	State,
	extractAllIds,
	f,
	getAncestors,
	getParentsById,
} from "./utils";
const ItemSeparator = () => <View style={styles.separator} />;

const TreeMenu = ({
	data,
	dataBlueprint,
}: {
	data: RandomEntry[];
	dataBlueprint: BlueprintObjType[];
}) => {
	const reducer = useCallback(
		(state: State, action: Action): State => {
			const ids = extractAllIds(action.payload);

			switch (action.type) {
				case "ADD":
					return [...state, ...ids];
				case "REMOVE": {
					const parents = getAncestors(
						action.payload.id as string,
						dataBlueprint,
					);
					return state.filter(
						(id) => !ids.includes(id) && !parents?.includes(id),
					);
				}
				default:
					return state;
			}
		},
		[dataBlueprint],
	);
	const [state, dispatch] = useReducer(reducer, []);
	return (
		<View style={styles.container}>
			<View style={styles.flatlist}>
				<FlatList
					data={dataBlueprint}
					keyExtractor={(item) => item.id.toString()}
					ItemSeparatorComponent={ItemSeparator}
					renderItem={({item}) => {
						return (
							<MenuItem
								colorShade={0}
								item={item}
								dispatch={dispatch}
								state={state}
							/>
						);
					}}
				/>
			</View>
			<Text selectable style={styles.info}>
				{JSON.stringify(state)}
			</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	separator: {
		height: 5,
	},
	flatlist: {
		flex: 10,
	},
	info: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
});

export default TreeMenu;
