const db = require('../config/db');

const getAllPets = async () => {
    const queryText = 'SELECT * FROM pet_table order by pet_name';

    try {
        const { rows } = await db.query(queryText);
        return rows;
    } catch (error) {
        throw error;
    }
};
const getPetByID = async (id) => {
    const queryText = 'SELECT * FROM pet_table where pet_id=$1';

    try {
        const { rows } = await db.query(queryText, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const createPet = async (pet) => {
    const { 
        pet_name, 
        pet_type, 
        pet_breed, 
        pet_age, 
        pet_price, 
        pet_status, 
        pet_size, 
        pet_character, 
        pet_physical_trait,
        pet_image_id,
        pet_description
    } = pet;

    // Split comma-separated strings into arrays
    const petCharacterArray = pet_character.split(',').map(trait => trait.trim());
    const petPhysicalTraitArray = pet_physical_trait.split(',').map(trait => trait.trim());

    const queryText = `
        INSERT INTO pet_table (
            pet_name, 
            pet_type, 
            pet_breed, 
            pet_age, 
            pet_price, 
            pet_status, 
            pet_size, 
            pet_character, 
            pet_physical_trait,
            pet_image_id,
            pet_description
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *`;

    try {
        const { rows } = await db.query(queryText, [
            pet_name, 
            pet_type, 
            pet_breed, 
            pet_age, 
            pet_price, 
            pet_status, 
            pet_size, 
            petCharacterArray,  // Array of text (text[])
            petPhysicalTraitArray,  // Array of text (text[])
            pet_image_id,
            pet_description
        ]);
        
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const updatePet = async (id, updatedData) => {
    const { pet_name, pet_type, pet_breed, pet_age, pet_traits, pet_price, pet_status, pet_size } = updatedData;
    const queryText = `
        UPDATE pet_table 
        SET 
            pet_name = $1,
            pet_type = $2,
            pet_breed = $3,
            pet_age = $4,
            pet_traits = $5,
            pet_price = $6,
            pet_status = $7,
            pet_size = $8
        WHERE 
            pet_id = $9
        RETURNING *`;

    try {
        const { rows } = await db.query(queryText, [pet_name, pet_type, pet_breed, pet_age, pet_traits, pet_price, pet_status, pet_size, id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};
const deletePet = async (id) => {
    const queryText = 'DELETE FROM pet_table WHERE pet_id = $1';

    try {
        await db.query(queryText, [id]);
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllPets,
    getPetByID,
    createPet,
    updatePet,
    deletePet
};
