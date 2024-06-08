const { getDatabase } = require('../models/geminiModel');
const { ChatOpenAI } = require("@langchain/openai");
const { QuerySqlTool } = require("langchain/tools/sql");
const { createSqlQueryChain } = require("langchain/chains/sql_db");
const { ChatPromptTemplate, PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RunnablePassthrough, RunnableSequence } = require("@langchain/core/runnables");

require('dotenv').config();

async function answerQuestion(req, res) {
    try {
        const db = await getDatabase();
        const llm = new ChatOpenAI({ model: "gpt-4", temperature: 0 });
        const executeQuery = new QuerySqlTool(db);
        const parser = new StringOutputParser();

        const petTypePrompt =
            PromptTemplate.fromTemplate(
                `
                Given the following user question, corresponding SQL query, and SQL result, anwer the closest pet type. Give only the type of pet as an answer.

                Question: {question}
                SQL Query: {query}
                SQL Result: {result}
                Answer: `);

        const petTypeChainAnswer = petTypePrompt.pipe(llm).pipe(parser);
        const petTypeChain = RunnableSequence.from([
            RunnablePassthrough.assign({ query: () => "select distinct pet_type from pet_table" }).assign({
                result: (i) => executeQuery.invoke(i.query),
            }),
            petTypeChainAnswer,
        ]);
        const petTypeAnswer = await petTypeChain.invoke({ question: req.body.question });
        console.log(petTypeAnswer);

        const petCharacteristics =
            `The user wants to buy a new {petType} and this is his criteria:{input}
            Based on the above criteria, give the ideal characteristics the {petType} should have. Give answers separated by commas`;
        const promptPetCharacteristics = ChatPromptTemplate.fromMessages([
            ["system", petCharacteristics],
        ]);

        const chainPetCharacteristics = promptPetCharacteristics.pipe(llm).pipe(parser);
        const resultPetCharacteristics = await chainPetCharacteristics.invoke({ petType: petTypeAnswer, input: req.body.question });
        console.log(resultPetCharacteristics);

        const answerPrompt =
            PromptTemplate.fromTemplate(
                `
                                Given the following user question, corresponding SQL query, and SQL result, answer the user question.

                                Question: {question}
                                SQL Query: {query}
                                SQL Result: {result}
                                Answer: `);

        const answerChain = answerPrompt.pipe(llm).pipe(parser);
        const chain = RunnableSequence.from([
            RunnablePassthrough.assign({ query: () => `select * from pet_table where pet_type='${petTypeAnswer}'` }).assign({
                result: (i) => executeQuery.invoke(i.query),
            }),
            answerChain,
        ]);

        const answer = await chain.invoke({ question:
            `Given the following characteristics that I want from a ${petTypeAnswer}: ${resultPetCharacteristics}.
            Choose 3 ${petTypeAnswer} that best match the characteristics I want.
            Give only the pet_id as the answer` });
        res.json({ answer });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    answerQuestion
};
