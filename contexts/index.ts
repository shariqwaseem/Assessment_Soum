import {createContext} from "react";
import {BlueprintObjType, RandomEntry} from "../types/Entries";
import {dataBlueprint} from "../utils";

export const DataContext = createContext({
	data: [] as RandomEntry[],
	dataBlueprint: [] as BlueprintObjType[],
});
