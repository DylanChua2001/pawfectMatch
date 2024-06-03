const openaiModel = require('../models/geminiModel');

const askOpenAI = async (req, res, next) => {
    const { prompt } = req.body;

    try {
        const answer = await openaiModel.askQuestion(prompt);
        res.status(200).json({ response: answer });
    } catch (error) {
        next(error);
    }
};

module.exports = { askOpenAI };
