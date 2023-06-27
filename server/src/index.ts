import 'dotenv/config';
import App from './app.js';
import IndexRoute from './routes/index.route.js';
import DataRoute from './routes/data.route.js';
import { Database } from './database.js';
import loggerFunction from './utils/genericLogger.js';
import { URL } from 'url';
import NotFoundRoute from './routes/notFound.route.js';

const __filename = new URL('', import.meta.url).pathname;
const logger = loggerFunction(__filename);

async function main() {
  try {
    const conn = await new Database().connect();
    const routes = [new IndexRoute(), new DataRoute(conn), new NotFoundRoute()];

    new App(routes).listen();
  } catch (err) {
    logger.error(err);
  }
}

main();
