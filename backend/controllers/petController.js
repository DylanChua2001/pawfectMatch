const petModel = require('../models/petModel');

const getAllPets = async (req, res, next) => {
    try {
        const allPets = await petModel.getAllPets();
        res.json(allPets);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPets
};
