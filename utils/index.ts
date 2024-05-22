import uuid from "react-native-uuid";
import {BlueprintObjType, RandomEntry} from "../types/Entries";

function getRandomElement<T>(arr: T[] | undefined): T {
	if (arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
	return null as T;
}

function generateRandomEntry() {
	const typeEntry = getRandomElement(dataBlueprint);
	const brandEntry = getRandomElement(typeEntry?.subCat);
	const modelEntry = getRandomElement(brandEntry?.subCat);
	const variantEntry = getRandomElement(modelEntry?.subCat);

	return {
		type: {name: typeEntry.name, id: typeEntry.id},
		brand: {name: brandEntry.name, id: brandEntry.id},
		model: {name: modelEntry.name, id: modelEntry.id},
		variant: {name: variantEntry.name, id: variantEntry.id},
		id: uuid.v4(),
	};
}
export function generateRandomEntries(count: number): RandomEntry[] {
	const entries: RandomEntry[] = [];
	for (let i = 0; i < count; i++) {
		entries.push(generateRandomEntry());
	}
	return entries;
}

export const dataBlueprint: BlueprintObjType[] = [
	{
		id: uuid.v4(),
		name: "Phones",
		subCat: [
			{
				id: uuid.v4(),
				name: "Apple iPhones",
				subCat: [
					{
						id: uuid.v4(),
						name: "iPhone 6",
						subCat: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
					{
						id: uuid.v4(),
						name: "iPhone 7",
						subCat: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
				],
			},
			{
				id: uuid.v4(),
				name: "Samsung Phones",
				subCat: [
					{
						id: uuid.v4(),
						name: "Galaxy S21",
						subCat: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
					{
						id: uuid.v4(),
						name: "Z Fold",
						subCat: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
				],
			},
		],
	},
	{
		id: uuid.v4(),
		name: "Computers",
		subCat: [
			{
				id: uuid.v4(),
				name: "Macbooks",
				subCat: [
					{
						id: uuid.v4(),
						name: "Macbook Air 2023",
						subCat: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
					{
						id: uuid.v4(),
						name: "Macbook Pro",
						subCat: [
							{id: uuid.v4(), name: "M1 256GB"},
							{id: uuid.v4(), name: "M2 512GB"},
							{id: uuid.v4(), name: "M3 Pro 1TB"},
						],
					},
				],
			},
			{
				id: uuid.v4(),
				name: "PCs",
				subCat: [
					{
						id: uuid.v4(),
						name: "Lenovo Thinkpad",
						subCat: [
							{id: uuid.v4(), name: "Core i7"},
							{id: uuid.v4(), name: "Core i5"},
							{id: uuid.v4(), name: "Core i9"},
						],
					},
					{
						id: uuid.v4(),
						name: "HP",
						subCat: [{id: uuid.v4(), name: "Core i9 128GB"}],
					},
				],
			},
		],
	},
	{
		id: uuid.v4(),
		name: "Watches",
		subCat: [
			{
				id: uuid.v4(),
				name: "Apple Watches",
				subCat: [
					{
						id: uuid.v4(),
						name: "Apple Watch 2023",
						subCat: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "LTE 128GB"},
						],
					},
					{
						id: uuid.v4(),
						name: "Apple Watch Pro",
						subCat: [
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "LTE 512GB"},
						],
					},
				],
			},
			{
				id: uuid.v4(),
				name: "Samsung Watches",
				subCat: [
					{
						id: uuid.v4(),
						name: "Samsung Watch 1",
						subCat: [
							{id: uuid.v4(), name: "Leather Strap LTE"},
							{id: uuid.v4(), name: "Metal Strap Non-LTE"},
						],
					},
					{
						id: uuid.v4(),
						name: "Samsung Watch 2",
						subCat: [{id: uuid.v4(), name: "Gold 256GB"}],
					},
				],
			},
		],
	},
	{
		id: uuid.v4(),
		name: "TVs",
		subCat: [
			{
				id: uuid.v4(),
				name: "Samsung TVs",
				subCat: [
					{
						id: uuid.v4(),
						name: "Samsung TV 2023",
						subCat: [
							{id: uuid.v4(), name: "51' LTE"},
							{id: uuid.v4(), name: "32'"},
						],
					},
					{
						id: uuid.v4(),
						name: "Samsung TV 2021",
						subCat: [
							{id: uuid.v4(), name: "51' LTE"},
							{id: uuid.v4(), name: "32'"},
						],
					},
				],
			},
			{
				id: uuid.v4(),
				name: "Apple TVs",
				subCat: [
					{
						id: uuid.v4(),
						name: "Apple TV 2021",
						subCat: [
							{id: uuid.v4(), name: "51' LTE"},
							{id: uuid.v4(), name: "32'"},
						],
					},
					{
						id: uuid.v4(),
						name: "Apple TV 2019",
						subCat: [
							{id: uuid.v4(), name: "51' LTE"},
							{id: uuid.v4(), name: "32'"},
						],
					},
				],
			},
		],
	},
];
