import express from 'express';
import { RouteMap } from './interfaces/routes.interface';
import { AppType } from './interfaces/AppType.interface';
declare class App {
    appMobile: express.Application;
    appWeb: express.Application;
    port: AppType;
    env: string;
    path: string;
    host: AppType;
    apiPath: string;
    listenAPP: string;
    constructor(routes: RouteMap[]);
    listen(): void;
    private connectToDatabase;
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeSwagger;
    private initializeErrorHandling;
    private initializeMulter;
}
export default App;
