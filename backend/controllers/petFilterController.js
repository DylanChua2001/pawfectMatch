const petFilterModel = require('../models/petFilterModel');

const getPetByID = async (req, res, next) => {
    const id = req.params.id; // Get the id from the request parameters

    try {
        const pet = await petFilterModel.getPetByID(id);
        if (pet) {
            res.json(pet); // Return the pet data as JSON
        } else {
            res.status(404).json({ message: 'Pet not found' }); // Pet not found
        }
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};

module.exports = {
    getPetByID
};