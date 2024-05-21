import React, {useState} from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {BlueprintObjType} from "../../types/Entries";
import Checkbox from "expo-checkbox";
import {Action, State} from "./utils";

interface Props {
	item: BlueprintObjType;
	colorShade: number;
	dispatch: React.Dispatch<Action>;
	state: State;
}
const MenuItem = ({item, colorShade, dispatch, state}: Props) => {
	const [showChildren, setShowChildren] = useState(false);
	const selected = state?.includes(item.id) ?? false;
	const addItemRecursivelyToState = (item: BlueprintObjType) => {
		dispatch({
			type: "ADD_ID",
			payload: item.id,
		});
		if (item.subCat && item?.subCat?.length > 0) {
			item.subCat.forEach((subItem) => {
				addItemRecursivelyToState(subItem);
			});
		}
	};
	const removeItemRecursivelyToState = (item: BlueprintObjType) => {
		dispatch({
			type: "REMOVE_ID",
			payload: item?.id,
		});
		if (item.subCat && item?.subCat?.length > 0) {
			item.subCat.forEach((subItem) => {
				removeItemRecursivelyToState(subItem);
			});
		}
	};
	return (
		<TouchableOpacity
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
							removeItemRecursivelyToState(item);
						} else {
							addItemRecursivelyToState(item);
						}
					}}
				/>
				<Text>{item.name}</Text>
			</View>
			{item?.subCat?.length && showChildren && (
				<View style={[styles.subMenu]}>
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
			return "#E8E8E8";
		case 3:
			return "#F8F8F8";
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
		backgroundColor: "#ededed",
	},
	subMenu: {
		marginTop: 15,
	},
	checkAndText: {
		// display:"flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
});
export default MenuItem;
