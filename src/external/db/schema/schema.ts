import * as t from 'drizzle-orm/pg-core';

export const product = t.pgTable('product', {
	id: t.serial('id').primaryKey(),
	name: t.text('name').notNull(),
	barcode: t.text('barcode'),
	cost: t.numeric('cost').default("0"),
	price: t.numeric('price').notNull(),
	stock_base: t.real('stock_base').default(0),
	stock_min: t.real('stock_min').default(0),
	stock_max: t.real('stock_max').default(0),
	tags: t.jsonb('etiquetas'),
	date: t.timestamp('data').defaultNow(),
	isUpdated: t.timestamp('atualizado').defaultNow(),
});

const statusVendaEnum = t.pgEnum('status', [
	'Concluida',
	'Pendente',
	'Cancelada',
]);

export const sales = t.pgTable('sales', {
	id: t.serial('id').primaryKey(),
	date: t.timestamp('date').defaultNow(),
	discount: t.numeric('discount').default('0'),
	status: statusVendaEnum('status').notNull(),
	payment: t.jsonb('payment').notNull(),
});

export const salesItem = t.pgTable('sales_item', {
	id: t.serial('id').primaryKey(),
	price: t.numeric('price').notNull(),
	quant: t.integer('quant').notNull(),
	discount: t.numeric('discount').default('0'),
	sales_id: t.integer('sales_id').references(() => sales.id),
	procuct_id: t.integer('product_id').references(() => product.id),
});

const typeFluxStock = t.pgEnum('type', ['Entrada', 'Saida']);

export const stock_movements = t.pgTable('stock_movements', {
	id: t.serial('id').primaryKey(),
	product_id: t.integer('produto_id').references(() => product.id),
	type: typeFluxStock('type').notNull(),
	quant: t.real('quant').notNull(),
	date: t.timestamp('date').defaultNow(),
});
