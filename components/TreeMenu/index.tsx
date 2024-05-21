import React, {useMemo} from "react";
import {FlatList, Text, View} from "react-native";
import {generateRandomEntries} from "../../utils";
import {RandomEntry} from "../../types/Entries";

const TreeMenu = ({data}: {data: RandomEntry[]}) => {
	return (
		<FlatList
			data={data}
			renderItem={({item}) => {
				return (
					<View style={{borderWidth: 1}}>
						<Text>{item.brand}</Text>
						<Text>{item.model}</Text>
						<Text>{item.variant}</Text>
						<Text>{item.type}</Text>
					</View>
				);
			}}
		/>
	);
};

export default TreeMenu;
