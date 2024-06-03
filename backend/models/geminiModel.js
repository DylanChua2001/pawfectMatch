const { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { VercelPostgres } = require("@langchain/community/vectorstores/vercel_postgres");
const { SqlDatabase } = require("langchain/sql_db");
const database = require('../config/db');
const { createClient } = require("@vercel/postgres");
require('dotenv').config();

(async () => {
    const client = createClient({
        connectionString: process.env.POSTGRES_URL,
    });
    await client.connect();

    const vectorstore = await VercelPostgres.initialize(
        new GoogleGenerativeAIEmbeddings({
            model: "gemini-pro",
            maxOutputTokens: 2048,
            apiKey: process.env.GOOGLE_GENAI_API_KEY
        }), {
        postgresConnectionOptions: {
            client,
        },
    });
    const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
    });
    console.log(db.allTables.map((t) => t.tableName));

    // Your code using db goes here
})();


// module.exports = { askQuestion };