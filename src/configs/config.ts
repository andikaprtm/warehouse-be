// Ensure the config object is correctly typed
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

type Dialect =
	| 'mysql'
	| 'postgres'
	| 'sqlite'
	| 'mariadb'
	| 'mssql'
	| 'db2'
	| 'snowflake'
	| 'oracle';

// Define the database configuration using environment variables
export const config: Config = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || '3306', 10), // Default to 3306
	dialect: (process.env.DB_DIALECT as Dialect) || 'mysql', // Default to MySQL
	logging: false,
	pool: {
		max: parseInt(process.env.DB_POOL_MAX || '5', 10), // Default max connections is 5
		min: parseInt(process.env.DB_POOL_MIN || '0', 10), // Default min connections is 0
		acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10), // Default acquire time
		idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10), // Default idle time
	},
	log:{
		format: process.env.LOG_FORMAT || 'dev',
	},
	cors: {
		origin: process.env.CORS_ORIGIN || '',
		credentials: process.env.CORS_CREDENTIALS || '',
	}
};

// Validate critical environment variables
if (!config.username || !config.password || !config.database || !config.host) {
	throw new Error(
		'Database configuration is incomplete. Please set all required environment variables.'
	);
}
