export type UnitOptions =
	| 'UN'
	| 'KG'
	| 'Metro'
	| 'Litro'
	| 'Caixa'
	| 'Pacote'
	| 'Fardo';

export interface Tag {
	key: number;
	text: string;
	color: string;
}

export class ProductEntity {
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
	private tags: Tag[] = [];

	calcPrice(): number {
		return this.margin != 0 ? this.cost * (1 + this.margin / 100) : this.price;
	}

	getID = () => this.ID;
	getBarcode = () => this.barcode;
	getName = () => this.name;
	getUnit = () => this.unit;
	getCost = () => this.cost;
	getMargin = () => this.margin;
	getPrice = () => this.price;
	getStock = () => this.stock;
	getTags = () => this.tags;
}

export class ProductBuilder {
	private product: ProductEntity;
	constructor() {
		this.product = new ProductEntity();
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
		this.product['price'] = price;
		return this;
	}

	setStock(base: number, min: number, max: number): ProductBuilder {
		this.product['stock'] = { base, min, max };
		return this;
	}

	setTags(tags: Tag[]): ProductBuilder {
		this.product['tags'] = tags;
		return this;
	}

	build(): ProductEntity {
		if (!this.product['name']) throw new Error('Produto precisa de nome');
		if (this.product['cost'] < 0) throw new Error('Custo inválido');
		if (this.product['price'] != this.product.calcPrice())
			throw new Error('O preço não condiz com calculo estabelecido');

		return this.product;
	}
}
