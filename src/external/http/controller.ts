import type { IProduct } from '../../internal/dto.ts';
import type { ProductUseCase } from '../../internal/usecase.ts';
import type { Request, Response } from 'express';

// revisar http status
export class ProductController {
	constructor(private useCase: ProductUseCase) {}

	saveProduct = async (req: Request, res: Response) => {
		let bodyReq = req.body as IProduct;
		this.useCase.saveProduct(bodyReq);
		res.status(200).send('product saved');
	};

	getProduct = async (req: Request, res: Response) => {
		let bodyReq = req.body as number;
		let response = this.useCase.getProduct(bodyReq);
		res.status(200).json(response);
	};

	getProductList = async (req: Request, res: Response) => {
		let response = this.useCase.getProductList();
		res.status(200).json(response);
	};

	editProduct = async (req: Request, res: Response) => {
		let bodyReq = req.body as IProduct;
		this.useCase.editProduct(bodyReq);
		res.status(200).send('product edited');
	};

	deleteProduct = async (req: Request, res: Response) => {
		let bodyReq = req.body as number;
		this.useCase.deleteProduct(bodyReq);
		res.status(204).send('product deleted');
	};
}
