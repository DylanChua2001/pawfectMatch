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
        host: "ep-small-band-a10fvigk-pooler.ap-southeast-1.aws.neon.tech",
        port: 5432,
        user: "default",
        password: "oZUWNIqJr43k",
        database: "verceldb",
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
