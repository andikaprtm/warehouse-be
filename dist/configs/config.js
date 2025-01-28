"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// Define the database configuration using environment variables
exports.config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10), // Default to 3306
    dialect: process.env.DB_DIALECT || 'mysql', // Default to MySQL
    logging: false,
    pool: {
        max: parseInt(process.env.DB_POOL_MAX || '5', 10), // Default max connections is 5
        min: parseInt(process.env.DB_POOL_MIN || '0', 10), // Default min connections is 0
        acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10), // Default acquire time
        idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10), // Default idle time
    },
    log: {
        format: process.env.LOG_FORMAT || 'dev',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '',
        credentials: process.env.CORS_CREDENTIALS || '',
    }
};
// Validate critical environment variables
if (!exports.config.username || !exports.config.password || !exports.config.database || !exports.config.host) {
    throw new Error('Database configuration is incomplete. Please set all required environment variables.');
}
//# sourceMappingURL=config.js.map