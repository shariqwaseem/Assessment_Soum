import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import MenuItem from "../components/TreeMenu/MenuItem";
import uuid from "react-native-uuid";
describe("MenuItem", () => {
	const id = uuid.v4();
	it("Child menu should appear when tapping the menu and hide when tapped again", () => {
		const {getByTestId, queryByTestId} = render(
			<MenuItem
				colorShade={0}
				item={{
					id,
					name: "iPhone 7",
					subCat: [
						{id: uuid.v4(), name: "128GB"},
						{id: uuid.v4(), name: "256GB"},
						{id: uuid.v4(), name: "512GB"},
					],
				}}
			/>,
		);

		fireEvent.press(getByTestId(`menu-item-${id}`));
		expect(getByTestId(`toggle-sub-menu-${id}`)).toBeTruthy();

		fireEvent.press(getByTestId(`menu-item-${id}`));
		expect(queryByTestId(`toggle-sub-menu-${id}`)).toBeNull();
	});
});
