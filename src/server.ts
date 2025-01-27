process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/web/auth.route';
import ProductRoute from './routes/web/product.route';
import DropdownRoute from './routes/dropdown.route';
import TransactionRoute from './routes/web/transaction.route';
import StockValidityRoute from './routes/web/stock-validity.route';
import DashboardRoute from './routes/web/dashboard.route';


const app = new App([
	{
		AppType: 'Mobile',
		Routes: [
		],
	},
	{
		AppType: 'Web',
		Routes: [
			new AuthRoute(),
			new ProductRoute(),
			new DropdownRoute(),
			new TransactionRoute(),
			new StockValidityRoute(),
			new DashboardRoute(),
		],
	},
]);

app.listen();
