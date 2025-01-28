interface Config {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string | undefined;
    port: number;
    dialect: Dialect;
    logging: boolean;
    pool: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    };
    log: {
        format: string;
    };
    cors: {
        origin: string;
        credentials: string;
    };
}
type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle';
export declare const config: Config;
export {};
