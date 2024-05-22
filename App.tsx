import {StatusBar} from "expo-status-bar";
import {SafeAreaView, StyleSheet, View} from "react-native";

import TreeMenu from "./components/TreeMenu";
import {useMemo} from "react";
import {generateRandomEntries, dataBlueprint} from "./utils";
import {DataContext} from "./contexts";

export default function App() {
	const randomData = useMemo(() => generateRandomEntries(300), []);

	return (
		<SafeAreaView style={styles.root} testID="app-root">
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
		// paddingHorizontal: 10,
		flex: 1,
	},
});
