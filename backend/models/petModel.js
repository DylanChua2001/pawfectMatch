const db = require('../config/db');

const getAllPets = async () => {
    const queryText = 'SELECT * FROM pet_table';

    try {
        const { rows } = await db.query(queryText);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllPets
};
