import type { ProductDto } from '../../internal/dto.ts';
import type { ProductUseCase } from '../../internal/usecase.ts';
import type { Request, Response } from 'express';

// *revisar http status
// *tratar erro gerais que borbulham nesta camada superior
export class ProductController {
	private useCase: ProductUseCase;
	constructor(useCase: ProductUseCase) {
		this.useCase = useCase;
	}

	saveProduct = async (req: Request, res: Response) => {
		let bodyReq = req.body as ProductDto;
		let response;
		try {
			response = await this.useCase.saveProduct(bodyReq);
		} catch (e: unknown) {
			res.status(400).send(e instanceof Error && e.message);
			return;
		}
		res.status(200).json(response);
	};

	getProduct = async (req: Request, res: Response) => {
		let paramReq = req.params.id;
		let response = await this.useCase.getProduct(Number(paramReq));
		res.status(200).json(response);
	};

	// *ponderá a adição da feature de paginação
	getProductList = async (_req: Request, res: Response) => {
		let response = await this.useCase.getProductList();
		res.status(200).json(response);
	};

	editProduct = async (req: Request, res: Response) => {
		let paramReq = req.params.id;
		let bodyReq = req.body as ProductDto;
		bodyReq.ID = Number(paramReq);
		await this.useCase.editProduct(bodyReq);
		res.status(200).send('product edited');
	};

	deleteProduct = async (req: Request, res: Response) => {
		let paramId = req.params.id;
		await this.useCase.deleteProduct(Number(paramId));
		res.status(204).send('product deleted');
	};
}
