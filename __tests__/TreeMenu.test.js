// __tests__
import * as React from "react";
import renderer from "react-test-renderer";
import {DataContext} from "../contexts";

import TreeMenu from "../components/TreeMenu";
import {dataBlueprint} from "../utils";
import App from "../App";

it(`App renders properly without issues`, () => {
	const app = renderer.create(<App />);
	expect(app).toMatchSnapshot();
});

it(`tree menu renders correctly when given dataBlueprint`, () => {
	const tree = renderer.create(
		<DataContext.Provider value={dataBlueprint}>
			<TreeMenu />
		</DataContext.Provider>,
	);
	expect(tree).toMatchSnapshot();
});
it(`Tree menu handles the case where datablueprint is an empty array and displays nothing without giving an error`, () => {
	const tree = renderer.create(
		<DataContext.Provider value={[]}>
			<TreeMenu />
		</DataContext.Provider>,
	);
	expect(tree).toMatchSnapshot();
});
