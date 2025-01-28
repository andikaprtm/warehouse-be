export declare const MobileConfig: (param: any) => {
    swaggerDefinition: {
        openapi: string;
        info: {
            title: string;
            version: string;
            description: string;
            termsOfService: string;
            contact: {
                email: string;
            };
            license: {
                name: string;
                url: string;
            };
        };
        externalDocs: {
            description: string;
            url: string;
        };
        servers: {
            url: string;
        }[];
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: string;
                    name: string;
                    scheme: string;
                    bearerFormat: string;
                    in: string;
                    description: string;
                };
            };
        };
        security: {
            bearerAuth: any[];
        }[];
    };
    apis: string[];
};
export declare const WebConfig: (param: any) => {
    swaggerDefinition: {
        openapi: string;
        info: {
            title: string;
            version: string;
            description: string;
            termsOfService: string;
            contact: {
                email: string;
            };
            license: {
                name: string;
                url: string;
            };
        };
        externalDocs: {
            description: string;
            url: string;
        };
        servers: {
            url: string;
        }[];
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: string;
                    name: string;
                    scheme: string;
                    bearerFormat: string;
                    in: string;
                    description: string;
                };
            };
        };
        security: {
            bearerAuth: any[];
        }[];
    };
    apis: string[];
};
