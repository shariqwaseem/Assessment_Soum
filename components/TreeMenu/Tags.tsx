import React from "react";
import {View, Text, StyleSheet, ScrollView, FlatList} from "react-native";

const Tags = ({tags}: {tags: (string | undefined)[]}) => {
	if (!tags) {
		return null;
	}
	return (
		<View style={styles.root}>
			<Text>Selected variants:</Text>
			<FlatList
				data={tags}
				renderItem={({item}: {item: string | undefined}) => {
					return (
						<View style={styles.tag}>
							<Text key={item}>{item}</Text>
						</View>
					);
				}}
				keyExtractor={(_, index: number) => index.toString()}
				horizontal={true}
				contentContainerStyle={{flexDirection: "row", flexWrap: "wrap"}}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		overflow: "scroll",
		flexGrow: 1,
		gap: 8,
		flexWrap: "wrap",
		flex: 1,
	},
	tag: {
		backgroundColor: "#E8E8E8",
		borderRadius: 4,
		padding: 6,
		marginRight: 10,
	},
	root: {
		padding: 5,
		gap: 4,
		flex: 1,
	},
});
export default Tags;
