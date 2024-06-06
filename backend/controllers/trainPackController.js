const db = require("../config/db")

const trainPackController = {
    getAllTrainingPack: async (req, res) => {
        try {
            const queryText = 'SELECT * FROM train_table'
            
            const {rows} = await db.query(queryText)

            res.status(200).json ({
                message : "All Training Package are Displayed",
                allTrainPack : rows
            })

        } catch (error) {
            res.status(404).json ({
                message : "No Training Packages Found"
            })
        }
    },

    createNewTrainingPack: async(req, res) => {
        try{
            const { train_name, train_desc, train_price } = req.body

            const queryText = `INSERT INTO train_table (train_name, train_desc, train_price) VALUES ($1, $2, $3) RETURNING *`
            const values = [train_name, train_desc, train_price]

            const {rows} = await db.query(queryText, values)

            res.status(201).json ({
                message : "A new training package has been created",
                newTrainPack : rows[0]
            })

        } catch (error) {

            res.status(404).json({
                message : "A new training package has failed to be created"
            })

        }
    },

    updateTrainingPack : async (req, res) => {
        try {
            
            const {train_name, train_desc, train_price} = req.body
            const {trainID} = req.params
            
            const queryText = `UPDATE train_table 
            SET 
                train_name = $1, 
                train_desc = $2, 
                train_price = $3
            WHERE 
                train_id = $4
            RETURNING *
            `

            const values = [train_name, train_desc, train_price, trainID]

            const {rows} = await db.query(queryText, values)

            if (rows) {
                res.status(200).json({
                    message : "Train Package Updated Successfully",
                    updateTrainPack : rows[0]
                })
            }
            else {
                res.status(404).json({
                    message : 'Train Package Not Found'
                })
            }
        }catch (error) {
            res.status(500).json({
                message: 'An error occurred while updating the training package',
                error: error.message
            })
        }
        
    },

    deleteTrainingPack: async(req, res) => {
        try {
            const {trainID} = req.params

            queryText = `DELETE FROM train_table WHERE train_id = $1 RETURNING * `

            const rows = await db.query(queryText,[trainID])

            if(rows){
                res.status(200).json({
                    message : "Training Package Deleted Successfully"
                })
            } else {
                res.status(404).json({
                    message: 'Training Package not found' 
                })
            }
        }
        catch(error){
            res.status(500).json({
                message: 'An error occurred while deleting the training package',
                error: error.message
            })
        }
    }
}

module.exports = trainPackController