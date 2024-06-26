import React, {useCallback, useContext, useMemo, useReducer} from "react";
import {FlatList, View} from "react-native";
import {StyleSheet} from "react-native";
import MenuItem from "./MenuItem";
import {
	Action,
	State,
	extractAllIds,
	findById,
	getAncestors,
	getChildren,
} from "./utils";
import Tags from "./Tags";
import {DataContext} from "../../contexts";
const ItemSeparator = () => <View style={styles.separator} />;

const TreeMenu = () => {
	const {dataBlueprint} = useContext(DataContext);

	const reducer = useCallback(
		(state: State, action: Action): State => {
			const ids = extractAllIds(action.payload);
			const parents = getAncestors(
				action.payload.id as string,
				dataBlueprint,
			);
			switch (action.type) {
				case "ADD":
					// Find if all children of a parent are selected, then select the parent too until all the parents are selected
					let newState = [...state, ...ids];
					parents?.reverse()?.forEach((child) => {
						// Remove first element because first element is self
						const children = getChildren(
							child,
							dataBlueprint,
						)?.slice(1);

						const allFoundChildrenTicked = children.every((sItem) =>
							newState.includes(sItem),
						);
						if (allFoundChildrenTicked) {
							newState.push(child);
						}
					});
					return newState;
				case "REMOVE": {
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

	const tags = useMemo(() => {
		const selectedItems = state.reduce((acc: string[][], id: string) => {
			const parents = getAncestors(id, dataBlueprint);
			if (parents && parents?.length > 1) {
				return [...acc, parents];
			} else {
				return acc;
			}
		}, []);

		let checkedSelected = new Set<string>();
		selectedItems?.forEach((item) => {
			for (let i = 0; i < item.length; i++) {
				if (item[i]) {
					const children = getChildren(item[i], dataBlueprint);
					if (checkedSelected.has(item?.[i])) {
						return;
					}
					if (children?.every((a) => a && state.includes(a))) {
						checkedSelected.add(
							JSON.stringify({heir: i, id: item?.[i]}),
						);
						return;
					}
				}
			}
		}, []);
		return [...checkedSelected]?.map((selectedItem) => {
			// Append the name of parent if the item is more than 2 down in the hierarchy.
			const {id, heir} = JSON.parse(selectedItem) || {};
			if (heir > 2) {
				const ancestors = getAncestors(id, dataBlueprint)?.map(
					(anses) => {
						return findById(dataBlueprint, anses)?.name;
					},
				);
				return (
					ancestors?.at(ancestors.length - 2) +
					" " +
					findById(dataBlueprint, id)?.name
				);
			}
			return "All " + findById(dataBlueprint, id)?.name;
		});
	}, [dataBlueprint, state]);

	return (
		<View style={styles.container} testID="tree-menu">
			<View style={styles.flatlist}>
				<FlatList
					data={dataBlueprint}
					keyExtractor={(item) => item.id.toString()}
					ItemSeparatorComponent={ItemSeparator}
					contentContainerStyle={{padding: 10}}
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
			<View style={styles.info}>
				<Tags tags={tags} />
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	separator: {
		height: 5,
	},
	flatlist: {
		flex: 8,
	},
	info: {
		flex: 1,
		paddingHorizontal: 10,
	},
	container: {
		flex: 1,
	},
});

export default TreeMenu;
