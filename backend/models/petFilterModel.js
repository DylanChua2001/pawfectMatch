const db = require('../config/db');

const getPetByID = async (id) => {
    const queryText = 'SELECT * FROM pet_table where pet_id=$1';

    try {
        const { rows } = await db.query(queryText, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getPetByID
};
