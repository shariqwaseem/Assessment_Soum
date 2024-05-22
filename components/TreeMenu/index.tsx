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
} from "./utils";
import Tags from "./Tags";
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
		});
	}, [dataBlueprint, state]);

	return (
		<View style={styles.container}>
			<View style={styles.flatlist}>
				<FlatList
					data={dataBlueprint}
					keyExtractor={(item) => item.id.toString()}
					ItemSeparatorComponent={ItemSeparator}
					ListFooterComponent={<View style={styles.listFooter} />}
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
	},
	container: {
		flex: 1,
	},
	listFooter: {
		marginBottom: 20,
	},
});

export default TreeMenu;
