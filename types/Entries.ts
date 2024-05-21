export interface RandomEntry {
	type: string;
	brand: string;
	model: string;
	variant: string;
}

export interface BlueprintObjType {
	id: string | number[];
	name: string;
	subCat?: BlueprintObjType[];
}
