const db = require("../config/db")


const txnController = {
    getAllTxn: async(req, res) => {
        try{

            const queryText = 'SELECT * FROM txn_table'

            const { rows } = await db.query(queryText)
            res.status(200).json({
                message : "All Transactions Are Generated.",
                allTxn : rows
            
            })
        } catch (error){
            res.status(404).json({
                message : "No Transactions are Found."
            })
        }
    },

    createNexTxn: async(req,res) => {
        try{
            const {user_id, txn_items, txn_amt, is_success} = req.body

            const queryText = `INSERT INTO txn_table (user_id, txn_items, txn_amt, is_success) VALUES ($1, $2, $3, $4) RETURNING *`
            const values = [user_id, txn_items, txn_amt, is_success]

            const {rows} = await db.query(queryText, values)

            res.status(200).json({
                message : "A Transaction Has Been Logged.",
                newTxn : rows[0]
            })
            
        } catch (error) {
            res.status(500).json({
                message : "A Transaction has Failed to be Logged.",
            })
        }

    },

    deleteTxn: async(req,res) => {
        try{
            const {txnID} = req.params
            
            const queryText = `DELETE FROM txn_table WHERE txn_id = $1 RETURNING *`

            const {rows} = await db.query(queryText, [txnID])

            if(rows){
                res.status(200).json({
                    message : "Transaction Deleted Successfully"
                })
            } else{
                res.status(404).json({
                    message: 'Transaction not found' 
                })
            }
        }catch (error) {

            res.status(500).json({
                message: 'An error occurred while deleting the transaction.',
                error: error.message
            });
            
        }
    }
}

module.exports = txnController