import type { IProduct } from '../../internal/dto.js';
import type { Idatabase } from '../../internal/ports.js';

export class DataBaseORM implements Idatabase {
	findProductById(id: number): boolean {}
	saveProcuct(product: IProduct): void {}
	getProduct(id: number): IProduct {}
	getProductList(): IProduct[] {}
	editProduct(info: IProduct): void {}
	deleteProduct(id: number): void {}
}
