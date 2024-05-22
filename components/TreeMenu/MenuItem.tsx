import React, {useCallback, useContext, useMemo, useState} from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {BlueprintObjType} from "../../types/Entries";
import Checkbox from "expo-checkbox";
import {Action, State, convertNumberToRange} from "./utils";
import {DataContext} from "../../contexts";

interface Props {
	item: BlueprintObjType;
	colorShade: number;
	dispatch: React.Dispatch<Action>;
	state: State;
}
const MenuItem = ({item, colorShade, dispatch, state}: Props) => {
	const {data} = useContext(DataContext);
	const [showChildren, setShowChildren] = useState(false);
	const selected = state?.includes(item.id as string);
	const count = useMemo(
		() =>
			convertNumberToRange(
				data.reduce((acc, dItem) => {
					if (
						Object.values(dItem)
							.map((s) => s.id)
							.includes(item.id)
					) {
						return acc + 1;
					}
					return acc;
				}, 0),
			),
		[data],
	);
	const selectItem = useCallback(
		(item: BlueprintObjType) => {
			dispatch({
				type: "ADD",
				payload: item,
			});
		},
		[dispatch],
	);

	const deselectItem = useCallback(
		(item: BlueprintObjType) => {
			dispatch({
				type: "REMOVE",
				payload: item,
			});
		},
		[dispatch],
	);

	return (
		<TouchableOpacity
			testID={`menu-item-${item.id}`}
			activeOpacity={!item?.subCat?.length ? 1 : 0.5}
			onPress={() => {
				setShowChildren((old) => {
					return !old;
				});
			}}
			style={[
				styles.container,
				{backgroundColor: getBackgroundColor(colorShade)},
			]}
		>
			<View style={styles.checkAndText}>
				<Checkbox
					hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
					value={selected}
					onValueChange={(newVal) => {
						if (!newVal) {
							deselectItem(item);
						} else {
							selectItem(item);
						}
					}}
				/>
				<View>
					<Text>{item.name}</Text>
					<Text style={styles.smallText}>{count} devices</Text>
				</View>
			</View>
			{item?.subCat?.length && showChildren && (
				<View
					testID={`toggle-sub-menu-${item.id}`}
					style={styles.subMenu}
				>
					<FlatList
						data={item?.subCat}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) => {
							return (
								<MenuItem
									colorShade={colorShade + 1}
									item={item}
									dispatch={dispatch}
									state={state}
								/>
							);
						}}
					/>
				</View>
			)}
		</TouchableOpacity>
	);
};

const getBackgroundColor = (colorShade: number) => {
	switch (colorShade) {
		case 1:
			return "#F0F0F0";
		case 2:
			return "#F5F5F5";
		case 3:
			return "white";
		default:
			return "#E8E8E8";
	}
};
const styles = StyleSheet.create({
	container: {
		padding: 10,
		margin: 2,
		justifyContent: "center",
		borderRadius: 3,
	},
	subMenu: {
		marginTop: 15,
	},
	smallText: {
		fontSize: 9,
	},
	checkAndText: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
});
export default MenuItem;
