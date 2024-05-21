import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import {BlueprintObjType} from "../../types/Entries";

interface Props {
	item: BlueprintObjType;
}
const MenuItem = ({item}: Props) => {
	return (
		<View style={styles.container}>
			<Text>{item.name}</Text>
			{item?.subCat?.length && (
				<FlatList
					style={{gap: 4}}
					data={item?.subCat}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => {
						return <MenuItem item={item} />;
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// height: 50,
		padding: 5,
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 3,
	},
});
export default MenuItem;
