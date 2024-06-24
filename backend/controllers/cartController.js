const db = require("../config/db")

const cartController = {

    getUserCartItems : async(req,res) => {
        try {
            const {userID} = req.params

            const queryText = 'SELECT user_cart FROM user_table WHERE user_id = $1'
            
            const {rows} = await db.query(queryText, [userID])
            

            if (rows.length > 0) {
                res.status(200).json({

                    message : `Cart for User with ID ${userID}`,
                    userCart : rows [0]

                })
            } else {
                res.status(404).json({
                    message: `Cart for user with ID ${userID} is empty`
                });
            }
        } catch (error) {

            res.status(500).json({ 
                message: 'Internal Server Error' 
            });

        }

    },

    addToUserCart: async (req, res) => {

        try {

            const {userID, newItem} = req.params

            const queryText = `UPDATE user_table
            SET user_cart = array_append(user_cart, $1)
            WHERE user_id = $2
            RETURNING user_cart`

            const values = [newItem, userID]

            const {rows} = await db.query(queryText, values)

            res.status(200).json({ 
                message: `Item '${newItem}' added to cart for user with ID ${userID}`,
                itemAdded : rows[0]
            });
            
        
        } catch (error) {
            res.status(500).json({ 
                message: 'Internal Server Error' 
            });
        }

    },


    deleteFromUserCart : async (req,res) => {

        try{     
            const {userID, deleteItem} = req.params

            const queryText = `UPDATE user_table
            SET user_cart = array_remove(user_cart, $1)
            WHERE user_id = $2
            RETURNING user_cart`

            const values = [deleteItem , userID]

            const {rows} = await db.query(queryText, values)

            if (rows.length > 0) {
                res.status(200).json({
                    message: `Item '${deleteItem}' deleted from the cart for user with ID ${userID}`,
                    updatedCart: rows[0].user_cart // Return the updated cart
                });
            } else {
                res.status(404).json({
                    message: `No cart found for user with ID ${userID} or item '${deleteItem}' not in cart`
                });
            }
        
        } catch (error) {
            res.status(500).json({ 
                message: 'Internal Server Error' 
            });
        }
    }

}

module.exports = cartController