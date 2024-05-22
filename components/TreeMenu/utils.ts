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
export function findById(
	array: BlueprintObjType[],
	id: string | undefined,
): BlueprintObjType | undefined {
	if (!id) {
		return undefined;
	}
	for (const item of array) {
		if (item.id === id) return item;
		if (item.subCat?.length) {
			const innerResult = findById(item.subCat, id);
			if (innerResult) return innerResult;
		}
	}
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
export function convertNumberToRange(number: number): string {
	if (number <= 24) {
		return number.toString();
	} else if (number <= 49) {
		return "25+";
	} else if (number <= 99) {
		return "50+";
	} else if (number <= 199) {
		return "100+";
	} else if (number <= 499) {
		return "200+";
	} else {
		return "500+";
	}
}

// Logic courtesy: https://stackoverflow.com/a/72631209
export function getChildren(targetKey: string, data: BlueprintObjType[]) {
	const targetKeysSet = new Set([targetKey]);
	const outputKeys: string[] = [];
	function getKeysHelper(
		data: BlueprintObjType[] | undefined,
		hasParentMatched = false,
	) {
		if (data) {
			data?.forEach((d) => {
				if (targetKeysSet.has(d.id as string) || hasParentMatched) {
					outputKeys.push(d.id as string);
					getKeysHelper(d.subCat, true);
				} else {
					getKeysHelper(d.subCat);
				}
			});
		}
	}
	getKeysHelper(data);
	return outputKeys;
}
