"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
const compression_1 = tslib_1.__importDefault(require("compression"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const config_1 = require("./configs/config");
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const databases_1 = tslib_1.__importDefault(require("./databases"));
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
const logger_1 = require("./configs/logger");
const swaggerConfig_1 = require("./swaggerConfig");
const multer_1 = tslib_1.__importDefault(require("multer"));
class App {
    constructor(routes) {
        this.appMobile = (0, express_1.default)();
        this.appWeb = (0, express_1.default)();
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
    listen() {
        if (this.listenAPP === '*' || this.listenAPP === 'mobile') {
            this.appMobile.listen(this.port.mobile, () => {
                logger_1.logger.info(`========================================================`);
                logger_1.logger.info(`=========== Vote Monitoring Mobile REST API ============`);
                logger_1.logger.info(`=================== ENV: ${this.env} ===================`);
                logger_1.logger.info(`🚀 API listening on http://localhost:${this.port.mobile}`);
                logger_1.logger.info(`🚀 API Docs listening on http://localhost:${this.port.mobile}/${this.apiPath}`);
                logger_1.logger.info(`========================================================\n`);
            });
        }
        if (this.listenAPP === '*' || this.listenAPP === 'web') {
            this.appWeb.listen(this.port.web, () => {
                logger_1.logger.info(`========================================================`);
                logger_1.logger.info(`============== Vote Monitoring Web REST API ==============`);
                logger_1.logger.info(`=================== ENV: ${this.env} ===================`);
                logger_1.logger.info(`🚀 API listening on http://localhost:${this.port.web}`);
                logger_1.logger.info(`🚀 API Docs listening on http://localhost:${this.port.web}/${this.apiPath}`);
                logger_1.logger.info(`========================================================\n`);
            });
        }
    }
    // public getServer() {
    //     return this.appMobile
    // }
    connectToDatabase() {
        databases_1.default.sequelize.sync({ force: false });
    }
    // private initializeFirebaseAdmin() {
    //   // Ensure Firebase Admin SDK is initialized only once
    //   if (!admin.apps.length) {
    //     admin.initializeApp({
    //       credential: admin.credential.applicationDefault(),
    //     });
    //   }
    // }
    initializeMiddlewares() {
        const corsOrigin = config_1.config.cors.origin.split(',');
        const corsCredentials = config_1.config.cors.credentials;
        const logFormat = config_1.config.log.format;
        const corsOptions = {
            origin: (origin, callback) => {
                if (corsOrigin.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: corsCredentials === 'true',
        };
        this.appMobile.options('*', (0, cors_1.default)(corsOptions));
        this.appMobile.use((0, cors_1.default)(corsOptions));
        this.appMobile.use((0, morgan_1.default)(logFormat, { stream: logger_1.stream }));
        this.appMobile.use((0, hpp_1.default)());
        this.appMobile.use((0, helmet_1.default)());
        this.appMobile.use((0, compression_1.default)());
        this.appMobile.use(express_1.default.json());
        this.appMobile.use(express_1.default.urlencoded({ extended: true }));
        this.appMobile.use(body_parser_1.default.urlencoded({ extended: true }));
        this.appMobile.use('/uploads', express_1.default.static('uploads'));
        this.appMobile.use((req, res, next) => {
            req.setTimeout(300000); // 5 minutes
            next();
        });
        this.appWeb.options('*', (0, cors_1.default)(corsOptions));
        this.appWeb.use((0, cors_1.default)(corsOptions));
        this.appWeb.use((0, morgan_1.default)(logFormat, { stream: logger_1.stream }));
        this.appWeb.use((0, hpp_1.default)());
        this.appWeb.use((0, helmet_1.default)());
        this.appWeb.use((0, compression_1.default)());
        this.appWeb.use(express_1.default.json());
        this.appWeb.use(express_1.default.urlencoded({ extended: true }));
        this.appWeb.use(body_parser_1.default.urlencoded({ extended: true }));
        this.appWeb.use('/uploads', express_1.default.static('uploads'));
        // this.appMobile.use(multer().array());
        // this.appMobile.use(express.static('public'));
    }
    initializeRoutes(routesMap) {
        routesMap.forEach((map) => {
            map.Routes.forEach((route) => {
                if (map.AppType == `Mobile` &&
                    (this.listenAPP === '*' || this.listenAPP === 'mobile')) {
                    this.appMobile.use(this.path, (req, res, next) => {
                        req.routeType = `Mobile`;
                        next();
                    }, route.router);
                }
                if (map.AppType == `Web` &&
                    (this.listenAPP === '*' || this.listenAPP === 'web')) {
                    this.appWeb.use(this.path, (req, res, next) => {
                        req.routeType = `Web`;
                        next();
                    }, route.router);
                }
            });
        });
    }
    initializeSwagger() {
        const Internaloptions = (0, swaggerConfig_1.MobileConfig)(this);
        const Internalspecs = (0, swagger_jsdoc_1.default)(Internaloptions);
        this.appMobile.use('/api-docs', swagger_ui_express_1.default.serveFiles(Internalspecs, {
            swaggerOptions: {
                docExpansion: 'none',
            },
        }), swagger_ui_express_1.default.setup(Internalspecs));
        const Externaloptions = (0, swaggerConfig_1.WebConfig)(this);
        const Externalspecs = (0, swagger_jsdoc_1.default)(Externaloptions);
        this.appWeb.use('/api-docs', swagger_ui_express_1.default.serveFiles(Externalspecs, {
            swaggerOptions: {
                docExpansion: 'none',
            },
        }), swagger_ui_express_1.default.setup(Externalspecs));
    }
    initializeErrorHandling() {
        this.appMobile.use(error_middleware_1.default);
        this.appWeb.use(error_middleware_1.default);
    }
    initializeMulter() {
        return (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map