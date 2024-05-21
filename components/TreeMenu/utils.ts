import {BlueprintObjType} from "../../types/Entries";

interface AddIdAction {
	type: "ADD";
	payload: BlueprintObjType;
}

interface RemoveIdAction {
	type: "REMOVE";
	payload: BlueprintObjType;
}

export type Action = AddIdAction | RemoveIdAction;

export type State = Array<string>;
export function extractAllIds(data: BlueprintObjType): string[] {
	let ids: string[] = [];

	function recurse(item: BlueprintObjType) {
		ids.push(item.id as string);
		item?.subCat?.forEach((subItem) => {
			recurse(subItem);
		});
	}

	recurse(data);
	return ids;
}

export const getAncestors = (
	target: string,
	blueprint: BlueprintObjType[] | undefined,
	ancestors = [] as string[],
): string[] | undefined => {
	if (!blueprint) {
		return undefined;
	}
	for (let node of blueprint) {
		if (node.id === target) {
			return ancestors.concat(node.id as string);
		}
		const found = getAncestors(
			target,
			node?.subCat,
			ancestors.concat(node.id as string),
		);
		if (found) {
			return found;
		}
	}
	return undefined;
};
