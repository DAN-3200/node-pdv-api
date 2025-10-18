import { toProductDto, type ProductDto } from './dto.ts';
import { ProductBuilder } from './entity.ts';
import type { ProductDBPorts } from './ports.ts';

export class ProductUseCase {
	private repo: ProductDBPorts;
	constructor(repo: ProductDBPorts) {
		this.repo = repo;
	}

	saveProduct = async (product: ProductDto): Promise<ProductDto> => {
		const productObj = new ProductBuilder()
			.setBarcode(product.barcode)
			.setName(product.name)
			.setUnit(product.unit)
			.setCost(product.cost)
			.setMargin(product.margin)
			.setPrice(product.price)
			.setStock(product.stock.base, product.stock.min, product.stock.max)
			.setTags(product.tags)
			.build();

		// console.table(product.tags);

		return await this.repo.saveProduct(toProductDto(productObj));
	};

	getProduct = async (id: number): Promise<ProductDto> =>
		await this.repo.getProduct(id);

	getProductList = async (): Promise<ProductDto[]> =>
		await this.repo.getProductList();

	// *aplicar validação com regra de negócio, ex: barCode já existente
	editProduct = async (info: Partial<ProductDto>): Promise<void> =>
		await this.repo.editProduct(info);

	deleteProduct = async (id: number): Promise<void> =>
		await this.repo.deleteProduct(id);
}
