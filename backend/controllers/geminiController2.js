const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { SqlDatabase } = require("langchain/sql_db");
const { DataSource } = require("typeorm");
const { QuerySqlTool } = require("langchain/tools/sql");
const { PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnablePassthrough, RunnableSequence } = require("@langchain/core/runnables");
require('dotenv').config();


(async () => {
    const datasource = new DataSource({
        type: "postgres",
        url: process.env.NEON_POSTGRES_CONNECTION_STRING,
        synchronize: true,
        logging: false,
    });
    const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
        ignoreTables: ['pet_table'],
    });
    console.log(db.allTables.map((t) => t.tableName));
    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-pro",
        maxOutputTokens: 2048,
        apiKey: process.env.GOOGLE_GENAI_API_KEY,
    });

    const executeQuery = new QuerySqlTool(db);
    const answerPrompt =
        PromptTemplate.fromTemplate(
            `The user is looking for a new pet.
            Given the following user question, corresponding SQL query, and SQL result, reccomend 3 pets, giving the pet_id and details.

            Question: {question}
            SQL Query: {query}
            SQL Result: {result}
            Answer: `);

    const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
        RunnablePassthrough.assign({ query: string }).assign({
            result: (i) => executeQuery.invoke(i.query),
        }),
        answerChain,
    ]);
    console.log(await chain.invoke({ question: "pet that is clever and not active" }));
})();
