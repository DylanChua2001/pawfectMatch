const petModel = require('../models/petModel');
const db = require("../config/db")

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
            res.status(200).send({ message: 'Pet successfully deleted' });
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        next(error);
    }
};

const uploadPetImageIDC = async(req,res) => {
    try {
        const {petID} = req.params
        const {photoID} = req.body

        console.log(petID)
        console.log(photoID)

        const queryText = `UPDATE pet_table 
        SET pet_image_id = $1
        WHERE pet_id = $2
        RETURNING pet_image_id`

        const values = [photoID, petID]

        const{rows} = await db.query(queryText, values)

        if (rows.length > 0) {
            res.status(200).json({

                message : `Photo for pet with ID ${petID} has been uploaded successfully`,
                petImage : rows[0].pet_image_id

            })
        } else {
            res.status(404).json({
                message: `Photo for pet with ID ${petID} has not been uploaded.`
            });
        }

    } catch (error) {

        res.status(500).json({ 
            message: 'Internal Server Error' 
        });

    }
}

const retrievePetImageIDC = async(req,res) => {
    try {
        const {petID} = req.params

        const queryText = 'SELECT pet_image_id FROM pet_table WHERE pet_id = $1';

        const values = [petID]

        const{rows} = await db.query(queryText, values)

        if (rows.length > 0) {
            res.status(200).json({

                message : `Photo for pet with ID ${petID} has been retrieved successfully`,
                petImage : rows

            })
        } else {
            res.status(404).json({
                message: `Photo for pet with ID ${petID} has failed to retrieve.`
            });
        }

    } catch (error) {

        res.status(500).json({ 
            message: 'Internal Server Error' 
        });

    }
}

module.exports = {
    getAllPets,
    getPetByID,
    createPet,
    updatePet,
    deletePet,
    uploadPetImageIDC,
    retrievePetImageIDC
};
