export interface RandomEntry {
	type: {name: string; id: string | number[]};
	brand: {name: string; id: string | number[]};
	model: {name: string; id: string | number[]};
	variant: {name: string; id: string | number[]};
	id: string | number[];
}

export interface BlueprintObjType {
	id: string | number[];
	name: string;
	subCat?: BlueprintObjType[];
}
