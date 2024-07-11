const db = require("../config/db")

const matchController = {
    getAllMatches: async (req, res) => {
        try {
            
            const queryText = 'SELECT * FROM adoption_table'
            
            const {rows} = await db.query(queryText) // await result before continuing
            

            if (rows.length > 0) {
                res.status(200).json({

                    message : `All matches displayed.`,
                    allMatches : rows[0]

                })
            } else {
                res.status(404).json({
                    message: `No matches found.`
                });
            }
        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },

    addAMatch: async (req, res) => {
        try {
            const {userID, petID} = req.params

            // update pet status in pet_table
            const statusQuery = `
                UPDATE pet_table 
                SET pet_status = $2 
                WHERE pet_id = $1
                RETURNING *;
            `;

            const statusValues = [petID, 'unavailable'];
            const { rows: updateRows } = await db.query(statusQuery, statusValues);

            // check if insert was successful
            if (updateRows.length > 0) {

                // Insert the match into the adoption_table
                const insertQuery = `INSERT INTO adoption_table (userID, petID) VALUES ($1, $2) RETURNING *`
                const insertValues = [userID, petID]

                const {rows: insertRows} = await db.query(insertQuery, insertValues)

                if (insertRows.length > 0) {
                    res.status(200).json({
                        message: "Match logged and pet status updated successfully",
                        successfulMatch: insertRows[0],
                        updatedPetStatus: updateRows[0]
                    });

                } else {

                    // update pet status in pet_table back to available
                    const statusQuery = `
                        UPDATE pet_table 
                        SET pet_status = $2 
                        WHERE pet_id = $1
                        RETURNING *;
                    `;

                    const statusValues = [petID, 'available'];
                    const { rows: updateRows } = await db.query(statusQuery, statusValues);

                    res.status(404).json({
                        message: `Pet status updated successfully but failed to log match. No user found with ID ${userID}`,
                        updatedPetStatus: updateRows[0]
                    });
                }

            } else {
                res.status(404).json({
                    message: `Failed to update pet status. No pet found with ID ${petID}`
                });
            }
                
        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },
}

module.exports = matchController