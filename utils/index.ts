import uuid from "react-native-uuid";
import {RandomEntry} from "../types/Entries";

function getRandomElement<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomEntry() {
	const typeEntry = getRandomElement(dataBlueprint);
	const brandEntry = getRandomElement(typeEntry.brand);
	const modelEntry = getRandomElement(brandEntry.model);
	const variantEntry = getRandomElement(modelEntry.variant);

	return {
		type: typeEntry.name,
		brand: brandEntry.name,
		model: modelEntry.name,
		variant: variantEntry.name,
	};
}
export function generateRandomEntries(count: number): RandomEntry[] {
	const entries: RandomEntry[] = [];
	for (let i = 0; i < count; i++) {
		entries.push(generateRandomEntry());
	}
	return entries;
}

const dataBlueprint = [
	{
		id: uuid.v4(),
		name: "Phones",
		brand: [
			{
				id: uuid.v4(),
				name: "Apple",
				model: [
					{
						id: uuid.v4(),
						name: "iPhone 6",
						variant: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
					{
						id: uuid.v4(),
						name: "iPhone 7",
						variant: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
				],
			},
			{
				id: uuid.v4(),
				name: "Samsung",
				model: [
					{
						id: uuid.v4(),
						name: "Galaxy S21",
						variant: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
					{
						id: uuid.v4(),
						name: "Z Fold",
						variant: [
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
		brand: [
			{
				id: uuid.v4(),
				name: "Macbooks",
				model: [
					{
						id: uuid.v4(),
						name: "Macbook Air 2023",
						variant: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "512GB"},
						],
					},
					{
						id: uuid.v4(),
						name: "Macbook Pro",
						variant: [
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
				model: [
					{
						id: uuid.v4(),
						name: "Lenovo Thinkpad",
						variant: [
							{id: uuid.v4(), name: "Core i7"},
							{id: uuid.v4(), name: "Core i5"},
							{id: uuid.v4(), name: "Core i9"},
						],
					},
					{
						id: uuid.v4(),
						name: "HP",
						variant: [{id: uuid.v4(), name: "Core i9 128GB"}],
					},
				],
			},
		],
	},
	{
		id: uuid.v4(),
		name: "Watches",
		brand: [
			{
				id: uuid.v4(),
				name: "Apple Watches",
				model: [
					{
						id: uuid.v4(),
						name: "Apple Watch 2023",
						variant: [
							{id: uuid.v4(), name: "128GB"},
							{id: uuid.v4(), name: "LTE 128GB"},
						],
					},
					{
						id: uuid.v4(),
						name: "Apple Watch Pro",
						variant: [
							{id: uuid.v4(), name: "256GB"},
							{id: uuid.v4(), name: "LTE 512GB"},
						],
					},
				],
			},
			{
				id: uuid.v4(),
				name: "PCs",
				model: [
					{
						id: uuid.v4(),
						name: "Lenovo Thinkpad",
						variant: [
							{id: uuid.v4(), name: "Core i7"},
							{id: uuid.v4(), name: "Core i5"},
							{id: uuid.v4(), name: "Core i9"},
						],
					},
					{
						id: uuid.v4(),
						name: "HP",
						variant: [{id: uuid.v4(), name: "Core i9 128GB"}],
					},
				],
			},
		],
	},
	{
		id: uuid.v4(),
		name: "TVs",
		brand: [
			{
				id: uuid.v4(),
				name: "Samsung TVs",
				model: [
					{
						id: uuid.v4(),
						name: "Samsung TV 2023",
						variant: [
							{id: uuid.v4(), name: "51' LTE"},
							{id: uuid.v4(), name: "32'"},
						],
					},
					{
						id: uuid.v4(),
						name: "Samsung TV 2021",
						variant: [
							{id: uuid.v4(), name: "51' LTE"},
							{id: uuid.v4(), name: "32'"},
						],
					},
				],
			},
			{
				id: uuid.v4(),
				name: "Apple TVs",
				model: [
					{
						id: uuid.v4(),
						name: "Apple TV 2021",
						variant: [
							{id: uuid.v4(), name: "51' LTE"},
							{id: uuid.v4(), name: "32'"},
						],
					},
					{
						id: uuid.v4(),
						name: "Apple TV 2019",
						variant: [
							{id: uuid.v4(), name: "51' LTE"},
							{id: uuid.v4(), name: "32'"},
						],
					},
				],
			},
		],
	},
];
