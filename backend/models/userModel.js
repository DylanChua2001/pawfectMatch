const db = require("../config/db")

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

const createNewUserM = async(newUserData) => {
    const {email_add, user_name, user_password, user_age, person_traits, user_pet_fav, is_admin} = newUserData
    
    const queryText = 'INSERT INTO user_table (email_add, user_name, user_password, user_age, person_traits, user_pet_fav, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    
    const values = [email_add, user_name, user_password, user_age, person_traits, user_pet_fav, is_admin]

    try{
        const {rows} = await db.query(queryText, values)
        return rows[0]
    }
    catch(error){
        throw error
    }
}

const updateUserM = async (userID, updateUserData) => {
    const {email_add, user_name, user_password, user_age, person_traits, user_pet_fav} = updateUserData

    const queryText = `UPDATE user_table   
    SET 
        email_add = $1,
        user_name = $2,
        user_password = $3,
        user_age = $4,
        person_traits = $5,
        user_pet_fav = $6
    WHERE
        user_id = $7
    RETURNING *` 

    const values = [email_add, user_name, user_password, user_age, person_traits, user_pet_fav, userID]

    try{
        const {rows} = await db.query(queryText,values)
        return rows[0]
    }
    catch(error) {
        throw error
    }
}

const deleteUserM = async (userID) => {
    const queryText = `DELETE FROM user_table WHERE user_id = $1`

    try{
        await db.query(queryText, [userID])
    } catch(error) {
        throw error
    }
}

module.exports = {
    getAllUserM,
    createNewUserM,
    updateUserM,
    deleteUserM
};
