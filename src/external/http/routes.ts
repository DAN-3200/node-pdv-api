import { ProductUseCase } from '../../internal/usecase.js';
import { ProductRepository } from '../adapters/repository.js';
import { ProductController } from './controller.js';
import Express from 'express';

export function setRoutes(server: Express.Application) {
	const repository = new ProductRepository();
	const useCase = new ProductUseCase(repository);
	const handle = new ProductController(useCase);

	// *vê se tem como fazer ao semelhante a server.group('product')
	server.post('/product', handle.saveProduct);
	server.get('/product/:id', handle.getProduct);
	server.get('/product-list', handle.getProductList);
	server.patch('/product/:id', handle.editProduct);
	server.delete('/product/:id', handle.deleteProduct);
}
