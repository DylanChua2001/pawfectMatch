const petFilterModel = require('../models/petFilterModel');

const filterPets = async (req, res, next) => {
    try {
        const pets = await petFilterModel.filterPets(req.query);
        if (pets.length>0) {
        res.status(200).json(pets);
        } else {
            res.status(404).json({ message: 'No such pet, try widening search results' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    filterPets
};