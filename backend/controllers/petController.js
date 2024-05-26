const petModel = require('../models/petModel');

const getAllPets = async (req, res, next) => {
    try {
        const allPets = await petModel.getAllPets();
        res.json(allPets);
    } catch (error) {
        next(error);
    }
};
const getPetByID = async (req, res, next) => {
    const id = req.params.id; // Get the id from the request parameters

    try {
        const pet = await petModel.getPetByID(id);
        if (pet) {
            res.json(pet); // Return the pet data as JSON
        } else {
            res.status(404).json({ message: 'Pet not found' }); // Pet not found
        }
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};
const createPet = async (req, res, next) => {
    try {
        const newPet = await petModel.createPet(req.body);
        res.status(201).json(newPet);
    } catch (error) {
        next(error);
    }
};
const updatePet = async (req, res, next) => {
    try {
        const updatedPet = await petModel.updatePet(req.params.id, req.body);
        if (updatedPet) {
            res.json(updatedPet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        next(error);
    }
};
const deletePet = async (req, res, next) => {
    try {
        const deletePet = await petModel.deletePet(req.params.id);
        if (deletePet) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPets,
    getPetByID,
    createPet,
    updatePet,
    deletePet
};
