const db = require('../config/db');

const filterPets = async (filters) => {
    let queryText = 'SELECT * FROM pet_table WHERE 1 = 1';
    const values = [];
    let valueIndex = 1;

    if (filters.pet_name) {
        const petNamePattern = `%${filters.pet_name}%`;
        queryText += ` AND pet_name LIKE $${valueIndex}`;
        values.push(petNamePattern);
        console.log(petNamePattern);
        valueIndex++;
    }
    if (filters.pet_type) {
        queryText += ` AND pet_type = $${valueIndex}`;
        values.push(filters.pet_type);
        valueIndex++;
    }
    if (filters.pet_breed) {
        queryText += ` AND pet_breed = $${valueIndex}`;
        values.push(filters.pet_breed);
        valueIndex++;
    }
    if (filters.pet_size) {
        queryText += ` AND pet_size = $${valueIndex}`;
        values.push(filters.pet_size);
        valueIndex++;
    }

    if (filters.min_age) {
        queryText += ` AND pet_age >= $${valueIndex}`;
        values.push(filters.min_age);
        valueIndex++;
    }
    if (filters.max_age) {
        queryText += ` AND pet_age <= $${valueIndex}`;
        values.push(filters.max_age);
        valueIndex++;
    }

    if (filters.min_price) {
        queryText += ` AND pet_price >= $${valueIndex}`;
        values.push(filters.min_price);
        valueIndex++;
    }
    if (filters.max_price) {
        queryText += ` AND pet_price <= $${valueIndex}`;
        values.push(filters.max_price);
        valueIndex++;
    }


    try {
        const { rows } = await db.query(queryText, values);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    filterPets
};
