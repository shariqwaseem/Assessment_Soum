import React, {useState} from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {BlueprintObjType} from "../../types/Entries";

interface Props {
	item: BlueprintObjType;
}
const MenuItem = ({item}: Props) => {
	const [showChildren, setShowChildren] = useState(false);
	return (
		<TouchableOpacity
			onPress={() => setShowChildren((old) => !old)}
			style={styles.container}
		>
			<Text>{item.name}</Text>
			{item?.subCat?.length && showChildren && (
				<FlatList
					style={{gap: 4}}
					data={item?.subCat}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => {
						return <MenuItem item={item} />;
					}}
				/>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		margin: 2,
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 3,
	},
});
export default MenuItem;
