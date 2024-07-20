const { getDatabase } = require('../models/openAIModel');
const { createDatabasePool } = require('../models/openAIModel');
const database = require('../config/db');
const jwt = require('jsonwebtoken');

const { ChatOpenAI } = require("@langchain/openai");
const { QuerySqlTool } = require("langchain/tools/sql");
const { ChatPromptTemplate, PromptTemplate, MessagesPlaceholder, } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnablePassthrough, RunnableSequence, RunnableWithMessageHistory } = require("@langchain/core/runnables");
const { PostgresChatMessageHistory } = require("@langchain/community/stores/message/postgres");

require('dotenv').config();

async function reccomendPet(req, res) {
    try {
        const JWT_SECRET = process.env.jwt;
        const db = await getDatabase();
        const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
        const executeQuery = new QuerySqlTool(db);
        const pool = await createDatabasePool();
        const userID = req.cookies.token ? jwt.verify(req.cookies.token, JWT_SECRET).userID : null;

        if (!userID) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const queryText = 'Select person_traits FROM user_table WHERE user_id = $1;';
        const result = await database.query(queryText, [userID]);
        const userTrait = result.rows[0].person_traits;
        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                `You are a pet shop assistant.
                Based on the following customer inputs, ask more question to get to know the customer's character better.
                Your aim is to match the customer with a pet based on the customer's character traits: ${userTrait}, pet's character, corresponding SQL query, and SQL result.
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
            { configurable: { sessionId: userID } }
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
        const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
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
            res.status(200).json(finalAnswer);
        } else {
            console.log(finalAnswer);
            res.status(300).json({ message: `We are unable to determine the pet that you want. Answer more questions first.` });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createUserProfile(req, res) {
    try {
        const JWT_SECRET = process.env.jwt;
        const db = await getDatabase();
        const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
        const executeQuery = new QuerySqlTool(db);
        const pool = await createDatabasePool();
        const userID = req.cookies.token ? jwt.verify(req.cookies.token, JWT_SECRET).userID : null;
        const sessionID = userID + 'user';

        if (!userID) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                `You are tasked to determine a potential pet owner character traits, ask questions to get to know more about the their character.
                Based on the following potential pet owner's inputs, ask more questions to get to know their character better.
                Your aim is to find out as as many of the potential pet owner character traits as possible.`,
            ],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
        ]);

        const chain = prompt.pipe(llm).pipe(new StringOutputParser());

        const chainWithHistory = new RunnableWithMessageHistory({
            runnable: chain,
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
            { configurable: { sessionId: sessionID } }
        );
        console.log(response);
        await pool.end();
        res.json({ response });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function saveUserProfile(req, res) {
    try {
        const JWT_SECRET = process.env.jwt;
        const db = await getDatabase();
        const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
        const executeQuery = new QuerySqlTool(db);
        const pool = await createDatabasePool();
        const userID = req.cookies.token ? jwt.verify(req.cookies.token, JWT_SECRET).userID : null;
        const parser = new StringOutputParser();
        const sessionID = userID + 'user';

        if (!userID) {
            return res.status(401).json({ error: "Unauthorized" });
        }

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
                    `SELECT message FROM public.langchain_chat_histories WHERE message->>'type' = 'human' and session_id = '${req.body.sessionID}';`
            }).assign({
                result: (i) => executeQuery.invoke(i.query),
            }),
            verifyAnswer,
        ]);
        const verifiedAnswer = await verifyAnswerChain.invoke({
            question: `
                Based on the follower user inputs, create a user profile that empahsizes the user's character traits.
            ` });

        console.log(verifiedAnswer);
        res.json({ verifiedAnswer });

        const updateQuery = `UPDATE public.user_table SET person_traits = $1 WHERE user_id = $2;`;
        await database.query(updateQuery, [verifiedAnswer, userID]);

        if (!res.headersSent) {
            res.status(200).json({ message: 'User profile updated successfully', profile: verifiedAnswer });
        }

    } catch (error) {
        console.error(error);
        // Ensure error response is sent only if headers are not already sent
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } finally {
        // Ensure the database connection is closed if opened
        if (database && database.end) {
            await database.end();
        }
    }
}



module.exports = {
    reccomendPet,
    getPetID,
    createUserProfile,
    saveUserProfile
};