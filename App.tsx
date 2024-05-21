import {StatusBar} from "expo-status-bar";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";

import TreeMenu from "./components/TreeMenu";
import {useMemo} from "react";
import {generateRandomEntries, dataBlueprint} from "./utils";

export default function App() {
	const randomData = useMemo(() => generateRandomEntries(100), []);

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.container}>
				<TreeMenu data={randomData} dataBlueprint={dataBlueprint} />
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		backgroundColor: "#fff",
		paddingHorizontal: 10,
	},
});
