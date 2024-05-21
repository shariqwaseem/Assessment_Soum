import React, {useMemo} from "react";
import {FlatList, Text, View} from "react-native";
import {generateRandomEntries} from "../../utils";
import {StyleSheet} from "react-native";
import {BlueprintObjType, RandomEntry} from "../../types/Entries";
import MenuItem from "./MenuItem";
const ItemSeparator = () => <View style={styles.separator} />;

const TreeMenu = ({
	data,
	dataBlueprint,
}: {
	data: RandomEntry[];
	dataBlueprint: BlueprintObjType[];
}) => {
	return (
		<FlatList
			style={{gap: 4}}
			data={dataBlueprint}
			keyExtractor={(item) => item.id.toString()}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({item}) => {
				return <MenuItem item={item} />;
			}}
		/>
	);
};
const styles = StyleSheet.create({
	separator: {
		height: 5,
	},
});

export default TreeMenu;
