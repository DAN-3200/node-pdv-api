import type { ProductDto } from '../../internal/dto.js';
import type { ProductDBPorts } from '../../internal/ports.js';
import { PrismaClient } from '@prisma/client';

// *ponderá se talvez dê erro de initial lag (isso inicializar depois das funções) ou não
const connect_prisma = new PrismaClient();

export class ProductRepository implements ProductDBPorts {
	private database = connect_prisma;

	async findProductById(id: number): Promise<boolean> {
		const isReal = await this.database.product.findUnique({
			where: { ID: id },
			select: { ID: true },
		});

		return isReal != null ? true : false;
	}

	async saveProduct(product: ProductDto): Promise<ProductDto> {
		let result = await this.database.product.create({
			data: {
				name: product.name,
				barcode: String(product.barcode),
				unit: product.unit,
				cost: product.cost,
				margin: product.margin,
				price: product.price,
				stockBase: product.stock.base,
				stockMin: product.stock.min,
				stockMax: product.stock.max,
				tags: { create: product.tags },
			},
			include: {
				tags: true, // inclui todas as tags criadas no retorno
			},
		});
		return {
			ID: result.ID,
			name: result.name,
			barcode: result.barcode,
			unit: result.unit,
			cost: result.cost,
			margin: result.margin,
			price: result.price,
			stock: {
				base: result.stockBase,
				min: result.stockMin,
				max: result.stockMax,
			},
			tags: result.tags.map((tag) => ({
				key: tag.key,
				text: tag.text,
				color: tag.color,
			})),
		} as ProductDto;
	}

	async getProduct(id: number): Promise<ProductDto> {
		let result = await this.database.product.findFirst({
			where: { ID: id },
			include: {
				tags: true, // inclui todas as tags criadas no retorno
			},
		});

		// *ponderá se devo retornar null
		if (!result) return {} as ProductDto;

		return {
			ID: result.ID,
			name: result.name,
			barcode: result.barcode,
			unit: result.unit,
			cost: result.cost,
			margin: result.margin,
			price: result.price,
			stock: {
				base: result.stockBase,
				min: result.stockMin,
				max: result.stockMax,
			},
			tags: result.tags.map((tag) => ({
				key: tag.key,
				text: tag.text,
				color: tag.color,
			})),
		} as ProductDto;
	}

	async getProductList(): Promise<ProductDto[]> {
		let result = await this.database.product.findMany({
			include: {
				tags: true, // inclui todas as tags criadas no retorno
			},
		});

		return result.map(
			(item) =>
				({
					ID: item.ID,
					name: item.name,
					barcode: item.barcode,
					unit: item.unit,
					cost: item.cost,
					margin: item.margin,
					price: item.price,
					stock: {
						base: item.stockBase,
						min: item.stockMin,
						max: item.stockMax,
					},
					tags: item.tags.map((tag) => ({
						key: tag.key,
						text: tag.text,
						color: tag.color,
					})),
				} as ProductDto)
		) as ProductDto[];
	}

	async editProduct(info: Partial<ProductDto>): Promise<void> {
		if (!info.ID) throw new Error('ID is required to edit product');

		const data: any = {};

		if (info.name !== undefined) data.name = info.name;
		if (info.barcode !== undefined) data.barcode = String(info.barcode);
		if (info.unit !== undefined) data.unit = info.unit;
		if (info.cost !== undefined) data.cost = info.cost;
		if (info.margin !== undefined) data.margin = info.margin;
		if (info.price !== undefined) data.price = info.price;

		if (info.stock !== undefined) {
			if (info.stock.base !== undefined) data.stockBase = info.stock.base;
			if (info.stock.min !== undefined) data.stockMin = info.stock.min;
			if (info.stock.max !== undefined) data.stockMax = info.stock.max;
		}

		
		if (info.tags !== undefined) {
			// Substitui o que tiver lá
			data.tags = {
				deleteMany: {}, // deleta tudo
				create: info.tags, // cria outros
			};
		}

		await this.database.product.update({ where: { ID: info.ID }, data });
	}

	async deleteProduct(id: number): Promise<void> {
		await this.database.product.delete({ where: { ID: id } });
	}
}
