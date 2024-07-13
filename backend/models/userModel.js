const db = require("../config/db")
const bcrypt = require("bcryptjs")

const getAllUserM = async () => {
    const queryText = 'SELECT * FROM user_table'

    try{
        const {rows} = await db.query(queryText)
        return rows
    }
    catch (error) {
        throw error;
    }
}

const getUserByID = async (id) => {
    const queryText = 'SELECT * FROM user_table where user_id=$1';

    try {
        const { rows } = await db.query(queryText, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const createNewUserM = async(newUserData) => {
    const {email_add, user_name, user_password, user_age, person_traits} = newUserData
    
    const queryText = 'INSERT INTO user_table (email_add, user_name, user_password, user_age, person_traits) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    
    const hashPassword = await bcrypt.hash(user_password, 10);

    const values = [email_add, user_name, hashPassword, user_age, person_traits]

    try{
        const {rows} = await db.query(queryText, values)
        return rows[0]
    }
    catch(error){
        throw error
    }
}

const updateUserM = async (userID, updateUserData) => {
    const fields = [];
    const values = [];
    let valueIndex = 1;
  
    // Build the query dynamically based on the provided update data
    for (const [key, value] of Object.entries(updateUserData)) {
      if (key === 'person_traits') {
        const traitsArray = value.split(',').map(trait => trait.trim()); // Split and trim the traits
        fields.push(`${key} = $${valueIndex}`);
        values.push(traitsArray);
      } else {
        fields.push(`${key} = $${valueIndex}`);
        values.push(value);
      }
      valueIndex++;
    }
  
    // Add the userID for the WHERE clause
    values.push(userID);
  
    const queryText = `
      UPDATE user_table
      SET ${fields.join(', ')}
      WHERE user_id = $${valueIndex}
      RETURNING *
    `;
  
    try {
      const { rows } = await db.query(queryText, values);
      return rows[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };
  
  
  

const deleteUserM = async (userID) => {
    const queryText = `DELETE FROM user_table WHERE user_id = $1`

    try {
        await db.query(queryText, [userID])
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUserM,
    getUserByID,
    createNewUserM,
    updateUserM,
    deleteUserM
};
