const { SqlDatabase } = require("langchain/sql_db");
const { DataSource } = require("typeorm");
const pg = require('pg');

async function getDatabase() {
    const datasource = new DataSource({
        type: "postgres",
        url: process.env.NEON_POSTGRES_CONNECTION_STRING,
        synchronize: true,
        logging: false,
    });
    return await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
    });
}

async function createDatabasePool() {
    const poolConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            rejectUnauthorized: false,
        }
    };
    return new pg.Pool(poolConfig);
}

module.exports = {
    getDatabase,
    createDatabasePool
};
