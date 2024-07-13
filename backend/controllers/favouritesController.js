const db = require("../config/db")

const favouritesController = {
    getAllFavPets: async (req, res) => {
        try {
            const {userID} = req.params
            
            const queryText = 'SELECT user_pet_fav FROM user_table WHERE user_id = $1'
            
            const {rows} = await db.query(queryText, [userID]) // await result before continuing
            

            if (rows.length > 0) {
                res.status(200).json({

                    message : `List of Favourite Pets for User with ID ${userID}`,
                    userFavPets : rows[0]

                })
            } else {
                res.status(404).json({
                    message: `No Favourite Pets for user with ID ${userID} found`
                });
            }
        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },

    addFavPet: async (req, res) => {
        try {
            const {userID, petID} = req.params

            const checkQuery = `
                SELECT user_pet_fav 
                FROM user_table 
                WHERE user_id = $1;
            `;

            const checkResult = await db.query(checkQuery, [userID]);

            if (checkResult.rows.length === 0) {
                return res.status(404).json({
                    message: `User with ID ${userID} not found`
                });
            }
            
            const queryText = `
                UPDATE user_table 
                SET user_pet_fav = array_append(user_pet_fav, $2)
                WHERE user_id = $1
                RETURNING user_pet_fav;
            `;
                    
            const {rows} = await db.query(queryText, [userID, petID]) // await result before continuing
            
            if (rows.length > 0) {
                res.status(200).json({

                    message: "Pet added to favourites successfully",
                    updatedUserFavPets: rows[0]

                })
            }

        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },

    deleteFavPet: async (req, res) => {
        try {
            const {userID, deletePet} = req.params
            
            const checkQuery = `
                SELECT user_pet_fav 
                FROM user_table 
                WHERE user_id = $1;
            `;

            const checkResult = await db.query(checkQuery, [userID]);

            if (checkResult.rows.length === 0) {
                return res.status(404).json({
                    message: `User with ID ${userID} not found`
                });
            }

            const currentFavPets = checkResult.rows[0].user_pet_fav;

            // Check if the train pack to be deleted is in the user's favorites
            if (!currentFavPets.includes(deletePet)) {
                return res.status(404).json({
                    message: `Training package ${deletePet} not found in user's favorite train packs`
                });
            }

            const queryText = `
                UPDATE user_table 
                SET user_pet_fav = array_remove(user_pet_fav, $2)
                WHERE user_id = $1
                RETURNING user_pet_fav;
            `;
                    
            const {rows} = await db.query(queryText, [userID, deletePet]) // await result before continuing
            
            if (rows.length > 0) {
                res.status(200).json({

                    message: "Favourite pet deleted successfully",
                    updatedUserFavPets: rows[0].user_pet_fav

                })
            } else {
                res.status(404).json({
                    message: `No Favourite Pets found for user with ID ${userID} or item ${deletePet} could not be found`
                });
            }

        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },

    getAllFavTrainPacks: async (req, res) => {
        try {
            const {userID} = req.params
            
            const queryText = 'SELECT user_train_fav FROM user_table WHERE user_id = $1'
            
            const {rows} = await db.query(queryText, [userID]) // await result before continuing
            

            if (rows.length > 0) {
                res.status(200).json({

                    message : `List of Favourite Training Packages for User with ID ${userID}`,
                    userFavPets : rows[0]

                })
            } else {
                res.status(404).json({
                    message: `No Favourite Training Packages for user with ID ${userID} found`
                });
            }
        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },

    addFavTrainPack: async (req, res) => {
        try {
            const {userID, addTrainPack} = req.params

            const checkQuery = `
                SELECT user_train_fav 
                FROM user_table 
                WHERE user_id = $1;
            `;

            const checkResult = await db.query(checkQuery, [userID]);

            if (checkResult.rows.length === 0) {
                return res.status(404).json({
                    message: `User with ID ${userID} not found`
                });
            }
            
            const queryText = `
                UPDATE user_table 
                SET user_train_fav = array_append(user_train_fav, $2)
                WHERE user_id = $1
                RETURNING user_train_fav;
            `;
                    
            const {rows} = await db.query(queryText, [userID, addTrainPack]) // await result before continuing
            
            if (rows.length > 0) {
                res.status(200).json({

                    message: "Training package added to favourites successfully",
                    updatedUserFavTrainPacks: rows[0]

                })
            }

        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },

    deleteFavTrainPack: async (req, res) => {
        try {
            const {userID, deleteTrainPack} = req.params

            const checkQuery = `
                SELECT user_train_fav 
                FROM user_table 
                WHERE user_id = $1;
            `;

            const checkResult = await db.query(checkQuery, [userID]);

            if (checkResult.rows.length === 0) {
                return res.status(404).json({
                    message: `User with ID ${userID} not found`
                });
            }

            const currentFavTrainPacks = checkResult.rows[0].user_train_fav;

            // Check if the train pack to be deleted is in the user's favorites
            if (!currentFavTrainPacks.includes(deleteTrainPack)) {
                return res.status(404).json({
                    message: `Training package ${deleteTrainPack} not found in user's favorite train packs`
                });
            }

            const queryText = `
                UPDATE user_table 
                SET user_train_fav = array_remove(user_train_fav, $2)
                WHERE user_id = $1
                RETURNING user_train_fav;
            `;
                    
            const {rows} = await db.query(queryText, [userID, deleteTrainPack]) // await result before continuing
            
            if (rows.length > 0) {
                res.status(200).json({

                    message: "Favourite training package deleted successfully",
                    updatedUserFavTrainPacks: rows[0].user_train_fav

                })
            } else {
                res.status(404).json({
                    message: `No Favourite Pets found for user with ID ${userID} or item ${deleteTrainPack} could not be found`
                });
            }

        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },

}

module.exports = favouritesController