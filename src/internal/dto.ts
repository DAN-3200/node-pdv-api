import type { ProductEntity, Tag, UnitOptions } from './entity.ts';

export interface ProductDto {
	ID: number;
	barcode: string;
	name: string;
	unit: UnitOptions;
	cost: number;
	margin: number;
	price: number;
	stock: {
		base: number;
		min: number;
		max: number;
	};
	tags: Tag[];
}

export const toProductDto = (product: ProductEntity): ProductDto => {
	return {
		ID: product.getID(),
		barcode: product.getBarcode(),
		name: product.getName(),
		unit: product.getUnit(),
		cost: product.getCost(),
		margin: product.getMargin(),
		price: product.getPrice(),
		stock: product.getStock(),
		tags: product.getTags(),
	} as ProductDto;
};

