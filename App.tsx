import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";

import TreeMenu from "./components/TreeMenu";
import {useMemo} from "react";
import {generateRandomEntries} from "./utils";

export default function App() {
	const randomData = useMemo(() => generateRandomEntries(100), []);

	return (
		<View style={styles.container}>
			<TreeMenu data={randomData} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
