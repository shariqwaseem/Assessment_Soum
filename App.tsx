import {StatusBar} from "expo-status-bar";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";

import TreeMenu from "./components/TreeMenu";
import {useMemo} from "react";
import {generateRandomEntries, dataBlueprint} from "./utils";
import {DataContext} from "./contexts";

export default function App() {
	const randomData = useMemo(() => generateRandomEntries(1000), []);

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.container}>
				<DataContext.Provider value={{data: randomData, dataBlueprint}}>
					<TreeMenu />
				</DataContext.Provider>
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
		flex: 1,
	},
});
