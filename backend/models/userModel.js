const db = require("../config/db")

const getAllUsers = async () => {
    const queryText = 'SELECT * FROM user_table'

    try{
        const {rows} = await db.query(queryText)
        return rows
    }
    catch (error) {
        throw error;
    }
}

const createNewUsersM = async(user) => {
    const {email_add, user_name, user_password, user_age, person_traits, user_pet_fav,
    is_admin} = user
    
    const queryText = 'INSERT INTO user_table(email_add, user_name, user_password,user_age, person_traits, user_pet_fav, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    
    const values = [email_add, user_name, user_password, user_age, person_traits, user_pet_fav, is_admin]

    try{
        const {rows} = await db.query(queryText, values)
        return rows [0]
    }
    catch(error){
        throw error
    }
}

module.exports = {
    getAllUsers, createNewUsersM
};
