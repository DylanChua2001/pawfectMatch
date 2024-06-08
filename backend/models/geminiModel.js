const { SqlDatabase } = require("langchain/sql_db");
const { DataSource } = require("typeorm");

async function getDatabase() {
    const datasource = new DataSource({
        type: "postgres",
        url: process.env.NEON_POSTGRES_CONNECTION_STRING,
        synchronize: true,
        logging: false,
    });
    return await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
        includeTables: ['pet_table'],
    });
}

module.exports = {
    getDatabase
};
