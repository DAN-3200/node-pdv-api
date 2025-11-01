import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { setRoutes } from './routes.ts';

export default function runServer() {
	const server = Express();
	const port = Deno.env.get("PORT") || 8080;

	server.use(Express.json(), morgan('dev'), cors());

	setRoutes(server);

	server.listen(port, () => {
		console.clear();
		console.log(`\nserver running [http://localhost:${port}/] \n`);
	});
}
