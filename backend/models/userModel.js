const db = require("../config/db")

const getAllUsersM = async () => {
    const queryText = 'SELECT * FROM user_table'

    try{
        const {rows} = await db.query(queryText)
        return rows
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsersM
};
