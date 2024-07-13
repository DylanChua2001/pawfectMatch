const { getDatabase } = require('../models/openAIModel');
const { createDatabasePool } = require('../models/openAIModel');
const database = require('../config/db');

const { ChatOpenAI } = require("@langchain/openai");
const { QuerySqlTool } = require("langchain/tools/sql");
const { ChatPromptTemplate, PromptTemplate, MessagesPlaceholder, } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnablePassthrough, RunnableSequence, RunnableWithMessageHistory } = require("@langchain/core/runnables");
const { PostgresChatMessageHistory } = require("@langchain/community/stores/message/postgres");

require('dotenv').config();

async function reccomendPet(req, res) {
    try {
        const db = await getDatabase();
        const llm = new ChatOpenAI({ model: "gpt-4", temperature: 0 });
        const executeQuery = new QuerySqlTool(db);
        const pool = await createDatabasePool();

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                `You are a pet shop assistant.
                Based on the following customer inputs, ask more question to get to know the customer's character better.
                Your aim is to match the customer with a pet based on the customer's character, pet's character, corresponding SQL query, and SQL result.
                Once a pet fulfils the customer's criteria, reccomend the pet with the corresponding pet_id. Only reccomend one pet.
                SQL Query: {query}
                SQL Result: {result}`,
            ],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
        ]);

        const chain = prompt.pipe(llm).pipe(new StringOutputParser());
        const petTypeChain = RunnableSequence.from([
            RunnablePassthrough.assign({ query: () => "select * from pet_table" }).assign({
                result: (i) => executeQuery.invoke(i.query),
            }),
            chain,
        ]);

        const chainWithHistory = new RunnableWithMessageHistory({
            runnable: petTypeChain,
            inputMessagesKey: "input",
            historyMessagesKey: "chat_history",
            getMessageHistory: async (sessionId) => {
                const chatHistory = new PostgresChatMessageHistory({
                    sessionId,
                    pool,
                });
                return chatHistory;
            },
        });
        const response = await chainWithHistory.invoke(
            {
                input: req.body.question,
            },
            { configurable: { sessionId: req.cookies.userID } }
        );
        console.log(response);
        await pool.end();
        res.json({ response });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getPetID(req, res) {
    try {
        const db = await getDatabase();
        const llm = new ChatOpenAI({ model: "gpt-4", temperature: 0 });
        const executeQuery = new QuerySqlTool(db);
        const parser = new StringOutputParser();

        const verifyAnswerPrompt =
            PromptTemplate.fromTemplate(
                `
        Given the following user question, corresponding SQL query, and SQL result, answer the user question.

        Question: {question}
        SQL Query: {query}
        SQL Result: {result}
        Answer: `);

        const verifyAnswer = verifyAnswerPrompt.pipe(llm).pipe(parser);
        const verifyAnswerChain = RunnableSequence.from([
            RunnablePassthrough.assign({
                query: () =>
                    `SELECT message FROM langchain_chat_histories WHERE session_id = '${req.body.sessionID}';`
            }).assign({
                result: (i) => executeQuery.invoke(i.query),
            }),
            verifyAnswer,
        ]);
        const verifiedAnswer = await verifyAnswerChain.invoke({
            question: `
            Does the content contain a pet_id?
            If the answer is yes, return only the latest pet_id as an integer answer.
            If not return: There is no pet_id.
            ` });

        const stringToInt = (str) => {
            const parsed = parseInt(str, 10);
            return isNaN(parsed) ? null : parsed;
        };
        const finalAnswer = stringToInt(verifiedAnswer);

        if (Number.isInteger(finalAnswer)) {
            console.log(finalAnswer);
            const queryText = 'DELETE FROM langchain_chat_histories WHERE session_id = $1;';
            const id = req.body.sessionID;
            await database.query(queryText, [id]);
            res.status(200).json({ message: `Chat record deleted successfully and proceeding to checkout page of pet_id ${finalAnswer}` });
            return res.json({ finalAnswer });
        } else {
            console.log(finalAnswer);
            res.status(300).json({ message: `We are unable to determine the pet that you want. Answer more questions first.` });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = {
    reccomendPet,
    getPetID,
};