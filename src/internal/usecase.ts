import type { IProduct } from './dto.js';
import { ProductBuilder } from './entity.js';
import type { Idatabase } from './ports.js';

export class ProductUseCase {
	private repo: Idatabase;

	constructor(repository: Idatabase) {
		this.repo = repository;
	}

	saveProduct(product: IProduct): void {
		const productObj = new ProductBuilder()
			.setBarcode(product.codigoBarras)
			.setName(product.nomeProduto)
			.setUnit(product.unidadeMedida)
			.setCost(product.custo)
			.setMargin(product.margem)
			.setPrice(product.preco)
			.setStock(
				product.quantidade.base,
				product.quantidade.min,
				product.quantidade.max
			)
			.setTags(product.etiquetas)
			.build();

		this.repo.saveProcuct(productObj.toDTO());
	}

	getProduct(id: number): IProduct {
		return this.repo.getProduct(id);
	}

	getProductList(): IProduct[] {
		return this.repo.getProductList();
	}

	editProductList(info: IProduct): void {
		return this.repo.editProduct(info);
	}

	deleteProduct(id: number): void {
		this.repo.deleteProduct(id);
	}
}
