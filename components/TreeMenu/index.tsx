import React, {useCallback, useEffect, useMemo, useReducer} from "react";
import {FlatList, View, Text} from "react-native";
import {StyleSheet} from "react-native";
import {BlueprintObjType, RandomEntry} from "../../types/Entries";
import MenuItem from "./MenuItem";
import {
	Action,
	State,
	extractAllIds,
	findById,
	getAncestors,
	getChildren,
	getLastTwoElements,
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
	const selectedItems = state.reduce((acc: string[][], id: string) => {
		const obj = findById(dataBlueprint, id);
		const parents = getAncestors(id, dataBlueprint);
		// console.log("parents", parents);
		// Check if all children of id are selected
		const children = getChildren(id, dataBlueprint);
		const childrensName = children?.map((childrenId) => {
			return findById(dataBlueprint, childrenId)?.name;
		});

		const allChildForIdSelected = children?.every((item) =>
			state.includes(id),
		);
		// console.log(
		// 	"allchildselected for this",
		// 	findById(dataBlueprint, id)?.name,
		// );

		if (parents && parents?.length > 1) {
			// const parentsName = parents.map((parentId) => {
			// 	return findById(dataBlueprint, parentId)?.name;
			// });
			// console.log("parents name", parentsName);
			// const concat = findById(
			// 	dataBlueprint,
			// 	parents[parents.length - 1],
			// )?.name;
			// console.log("concat", concat, obj);
			return [...acc, parents];
			// const oldArray = acc[`${concat}`] ?? [];
			// return {...acc, [`${concat}`]: [...oldArray, obj.name]};
			// return (concat ?? "") + " " + obj?.name;
		} else {
			return acc;
		}
	}, []);
	const tags = useMemo(() => {
		// selectedItems;
		console.log(
			"selected items",
			selectedItems?.map((item) =>
				item.map((sitem) => findById(dataBlueprint, sitem)?.name),
			),
		);
		console.log(
			"all selected",
			state.map((item) => findById(dataBlueprint, item)?.name),
		);
		let checkedSelected = new Set<string>();
		let checkedNotSelected = new Set<string>();
		selectedItems?.reduce((acc, item) => {
			for (let i = 0; i < item.length; i++) {
				if (item[i]) {
					// console.log("sitem", sItem);

					const children = getChildren(item[i], dataBlueprint);
					const childrensName = children?.map((childrenId) => {
						return findById(dataBlueprint, childrenId)?.name;
					});

					if (checkedSelected.has(item?.[i])) {
						return;
					}
					console.log(
						"checking",
						findById(dataBlueprint, item?.[i])?.name,
						"its children are",
						childrensName,
					);
					// console.log("checking ", item[i], childrensName);
					if (children?.every((a) => a && state.includes(a))) {
						console.log(
							"added entry",
							findById(dataBlueprint, item?.[i])?.name,
						);
						console.log("\n");

						checkedSelected.add(
							JSON.stringify({heir: i, id: item?.[i]}),
						);
						return;
					}
				}
			}
			// item.forEach((sItem) => {});
		}, []);
		console.log(
			"x",
			[...checkedSelected].flat().map?.((selectedItem) => {
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
				return findById(dataBlueprint, id)?.name;
			}),
		);
	}, [selectedItems, dataBlueprint, state]);
	// useEffect(() => {}, [selectedItems]);
	// useEffect(() => {
	// 	// console.log("selected items index", state);
	// }, [state]);

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
				{JSON.stringify(selectedItems)}
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
