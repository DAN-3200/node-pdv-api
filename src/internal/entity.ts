import type { IProduct } from './dto.js';

export type UnitOptions =
	| 'UN'
	| 'KG'
	| 'Metro'
	| 'Litro'
	| 'Caixa'
	| 'Pacote'
	| 'Fardo';

export class Product {
	private ID: number = 0;
	private barcode: string = '';
	private name: string = '';
	private unit: UnitOptions = 'UN';
	private cost: number = 0;
	private margin: number = 0;
	private price: number = 0;
	private stock: {
		base: number;
		min: number;
		max: number;
	} = { base: 0, max: 0, min: 0 };
	private tags: string[] = [];

	calcPrice(): number {
		return this.cost * this.margin;
	}

	toDTO(): IProduct {
		return {
			id: this.ID,
			codigoBarras: this.barcode,
			nomeProduto: this.name,
			unidadeMedida: this.unit,
			custo: this.cost,
			margem: this.margin,
			preco: this.price,
			quantidade: this.stock,
			etiquetas: this.tags,
		} as IProduct;
	}
}

export class ProductBuilder {
	private product: Product;
	constructor() {
		this.product = new Product();
	}

	setID(id: number): ProductBuilder {
		this.product['ID'] = id;
		return this;
	}

	setBarcode(barcode: string): ProductBuilder {
		this.product['barcode'] = barcode;
		return this;
	}

	setName(name: string): ProductBuilder {
		this.product['name'] = name;
		return this;
	}

	setUnit(unit: UnitOptions): ProductBuilder {
		this.product['unit'] = unit;
		return this;
	}

	setCost(cost: number): ProductBuilder {
		this.product['cost'] = cost;
		return this;
	}

	setMargin(margin: number): ProductBuilder {
		this.product['margin'] = margin;
		return this;
	}

   setPrice(price: number): ProductBuilder {
      this.product['price'] = price
      return this
   }

	setStock(base: number, min: number, max: number): ProductBuilder {
		this.product['stock'] = { base, min, max };
		return this;
	}

	setTags(tags: string[]): ProductBuilder {
		this.product['tags'] = tags;
		return this;
	}

	build(): Product {
		if (!this.product['name']) throw new Error('Produto precisa de nome');
		if (this.product['cost'] <= 0) throw new Error('Custo inválido');
		if (this.product['price'] != this.product.calcPrice()) throw new Error('O preço não condiz com calculo estabelecido');

		return this.product;
	}
}
