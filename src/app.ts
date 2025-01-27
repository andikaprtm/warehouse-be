process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cors from 'cors';
import { config } from '@/configs/config';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import DB from '@/databases';
import { Routes, RouteMap } from '@/interfaces/routes.interface';
import { AppType } from '@/interfaces/AppType.interface';
import errorMiddleware from '@/middlewares/error.middleware';
import { logger, stream } from '@/configs/logger';
import { MobileConfig, WebConfig } from 'swaggerConfig';
import multer from 'multer';
import cloudinary from 'cloudinary';

class App {
	public appMobile: express.Application;
	public appWeb: express.Application;
	public port: AppType;
	public env: string;
	public path: string;
	public host: AppType;
	public apiPath: string;
	public listenAPP: string;

	constructor(routes: RouteMap[]) {
		this.appMobile = express();
		this.appWeb = express();

		this.listenAPP = process.env.LISTEN_APP || '*';
		this.path = '/api';
		this.apiPath = process.env.API_DOCS_PATH || '/api-docs';
		this.env = process.env.NODE_ENV || 'development';
		this.port = {
			mobile: parseInt(process.env.PORT_MOBILE) || 3030,
			web: parseInt(process.env.PORT_WEB) || 3040,
		};
		this.host = {
			mobile: process.env.HOST_MOBILE || 'localhost',
			web: process.env.HOST_WEB || 'localhost',
		};

		// EmailService('test@mail', 'Test Email subject', 'Test Email Body');
		// this.initializeFirebaseAdmin();
		this.initializeMiddlewares();
		this.connectToDatabase();
		this.initializeRoutes(routes);
		this.initializeSwagger();
		this.initializeErrorHandling();
	}

	public listen() {
		if (this.listenAPP === '*' || this.listenAPP === 'mobile') {
			this.appMobile.listen(this.port.mobile, () => {
				logger.info(`========================================================`);
				logger.info(`=========== Vote Monitoring Mobile REST API ============`);
				logger.info(`=================== ENV: ${this.env} ===================`);
				logger.info(`🚀 API listening on http://localhost:${this.port.mobile}`);
				logger.info(
					`🚀 API Docs listening on http://localhost:${this.port.mobile}/${this.apiPath}`
				);
				logger.info(`========================================================\n`);
			});
		}

		if (this.listenAPP === '*' || this.listenAPP === 'web') {
			this.appWeb.listen(this.port.web, () => {
				logger.info(`========================================================`);
				logger.info(`============== Vote Monitoring Web REST API ==============`);
				logger.info(`=================== ENV: ${this.env} ===================`);
				logger.info(`🚀 API listening on http://localhost:${this.port.web}`);
				logger.info(
					`🚀 API Docs listening on http://localhost:${this.port.web}/${this.apiPath}`
				);
				logger.info(`========================================================\n`);
			});
		}
	}

	// public getServer() {
	//     return this.appMobile
	// }

	private connectToDatabase() {
		DB.sequelize.sync({ force: false });
	}

	// private initializeFirebaseAdmin() {
	//   // Ensure Firebase Admin SDK is initialized only once
	//   if (!admin.apps.length) {
	//     admin.initializeApp({
	//       credential: admin.credential.applicationDefault(),
	//     });
	//   }
	// }

	private initializeMiddlewares() {
		const corsOrigin = config.cors.origin.split(',');
		const corsCredentials = config.cors.credentials;
		const logFormat = config.log.format;

		const corsOptions = {
			origin: (origin, callback) => {
				if (corsOrigin.indexOf(origin) !== -1 || !origin) {
					callback(null, true);
				} else {
					callback(new Error('Not allowed by CORS'));
				}
			},
			credentials: corsCredentials === 'true',
		};

		this.appMobile.options('*', cors(corsOptions));
		this.appMobile.use(cors(corsOptions));
		this.appMobile.use(morgan(logFormat, { stream }));
		this.appMobile.use(hpp());
		this.appMobile.use(helmet());
		this.appMobile.use(compression());
		this.appMobile.use(express.json());
		this.appMobile.use(express.urlencoded({ extended: true }));
		this.appMobile.use(bodyParser.urlencoded({ extended: true }));
		this.appMobile.use('/uploads', express.static('uploads'));
		this.appMobile.use((req, res, next) => {
			req.setTimeout(300000); // 5 minutes
			next();
		});

		this.appWeb.options('*', cors(corsOptions));
		this.appWeb.use(cors(corsOptions));
		this.appWeb.use(morgan(logFormat, { stream }));
		this.appWeb.use(hpp());
		this.appWeb.use(helmet());
		this.appWeb.use(compression());
		this.appWeb.use(express.json());
		this.appWeb.use(express.urlencoded({ extended: true }));
		this.appWeb.use(bodyParser.urlencoded({ extended: true }));
		this.appWeb.use('/uploads', express.static('uploads'));

		// this.appMobile.use(multer().array());
		// this.appMobile.use(express.static('public'));
	}

	private initializeRoutes(routesMap: RouteMap[]) {
		routesMap.forEach((map: RouteMap) => {
			map.Routes.forEach((route: Routes) => {
				if (
					map.AppType == `Mobile` &&
					(this.listenAPP === '*' || this.listenAPP === 'mobile')
				) {
					this.appMobile.use(
						this.path,
						(req: any, res: Response, next: NextFunction) => {
							req.routeType = `Mobile`;
							next();
						},
						route.router
					);
				}

				if (
					map.AppType == `Web` &&
					(this.listenAPP === '*' || this.listenAPP === 'web')
				) {
					this.appWeb.use(
						this.path,
						(req: any, res: Response, next: NextFunction) => {
							req.routeType = `Web`;
							next();
						},
						route.router
					);
				}
			});
		});
	}

	private initializeSwagger() {
		const Internaloptions = MobileConfig(this);
		const Internalspecs = swaggerJSDoc(Internaloptions);
		this.appMobile.use(
			'/api-docs',
			swaggerUi.serveFiles(Internalspecs, {
				swaggerOptions: {
					docExpansion: 'none',
				},
			}),
			swaggerUi.setup(Internalspecs)
		);

		const Externaloptions = WebConfig(this);
		const Externalspecs = swaggerJSDoc(Externaloptions);
		this.appWeb.use(
			'/api-docs',
			swaggerUi.serveFiles(Externalspecs, {
				swaggerOptions: {
					docExpansion: 'none',
				},
			}),
			swaggerUi.setup(Externalspecs)
		);
	}

	private initializeErrorHandling() {
		this.appMobile.use(errorMiddleware);
		this.appWeb.use(errorMiddleware);
	}

	private initializeMulter() {
		return multer({ storage: multer.memoryStorage() });
	}
}

export default App;
