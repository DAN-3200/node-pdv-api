import type { ProductDto } from './dto.ts';

export interface ProductDBPorts {
	findProductById(id: number): Promise<boolean>;
	saveProduct(product: ProductDto): Promise<ProductDto>;
	getProduct(id: number): Promise<ProductDto>;
	getProductList(): Promise<ProductDto[]>;
	editProduct(info: Partial<ProductDto>): Promise<void>;
	deleteProduct(id: number): Promise<void>;
}
