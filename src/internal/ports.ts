import type { IProduct } from './dto.js';

export interface Idatabase {
	findProductById(id: number): boolean; // existe um fast-check (ping-pong) pra saber se existe ou não
	saveProcuct(product: IProduct): void;
	getProduct(id: number): IProduct;
	getProductList(): IProduct[];
	editProduct(info: IProduct): void;
	deleteProduct(id: number): void;
}
