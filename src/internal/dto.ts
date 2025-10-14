import type { UnitOptions } from "./entity.js";

export interface IProduct {
	id: number;
	codigoBarras: string;
	nomeProduto: string;
	unidadeMedida: UnitOptions;
	custo: number;
	margem: number;
	preco: number;
	quantidade: {
		base: number;
		min: number;
		max: number;
	};
	etiquetas: string[];
}
