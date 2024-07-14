const userModel = require("../models/userModel")
const db = require("../config/db")

const getAllUserC = async(req,res,next) => {
    try{
        const allUsers  = await userModel.getAllUserM()
        res.json(allUsers)
    }
    catch (error){
        next(error)
    }
}

const getUserByID = async (req, res, next) => {
    const id = req.params.id; // Get the id from the request parameters

    try {
        const user = await userModel.getUserByID(id);
        if (user) {
            res.json(user); // Return the pet data as JSON
        } else {
            res.status(404).json({ message: 'User not found' }); // Pet not found
        }
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};

const createNewUserC = async (req, res, next) => {
    try{
        const newUser = await userModel.createNewUserM(req.body)
        res.status(201).json({
            message : "User Created Successfully",
            user : newUser
        })
    }
    catch(error){
        next(error)
    }
}

const updateUserC = async (req, res, next) => {
    try {
        const updateUser = await userModel.updateUserM(req.params.userID, req.body)
        if (updateUser) {
            res.status(200).json({
                message : "User Data Updated Successfully",
                user : updateUser
            })
        }
        else {
            res.status(404).json({
                message : 'User not found'
            })
        }
    }
    catch(error) {
        next(error)
    }
}

const deleteUserC = async (req, res, next) => {
    try {
        const deleteUser = await userModel.deleteUserM (req.params.userID)
        console.log(deleteUser)
        if (deleteUser){
            console.log(deleteUser)
            res.status(200).json({
                message : "User Data Deleted Successfully"
            })
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch(error){
        next(error)
    }
}

const uploadUserImageIDC = async(req,res) => {
    try {
        const {userID} = req.params
        const {photoID} = req.body

        const queryText = `UPDATE user_table 
        SET user_image_id = $1
        WHERE user_id = $2
        RETURNING user_image_id`

        const values = [photoID, userID]

        const{rows} = await db.query(queryText, values)

        if (rows.length > 0) {
            res.status(200).json({

                message : `Photo for User with ID ${userID} has been uploaded successfully`,
                userImage : rows[0].user_photo

            })
        } else {
            res.status(404).json({
                message: `Photo for user with ID ${userID} has not been uploaded.`
            });
        }

    } catch (error) {

        res.status(500).json({ 
            message: 'Internal Server Error' 
        });

    }
}


const retrieveUserImageIDC = async(req,res) => {
    try {
        const {userID} = req.params

        const queryText = 'SELECT user_image_id FROM user_table WHERE user_id = $1';

        const values = [userID]

        const{rows} = await db.query(queryText, values)

        if (rows.length > 0) {
            res.status(200).json({

                message : `Photo for User with ID ${userID} has been retrieved successfully`,
                userImage : rows

            })
        } else {
            res.status(404).json({
                message: `Photo for user with ID ${userID} has failed to retrieve.`
            });
        }

    } catch (error) {

        res.status(500).json({ 
            message: 'Internal Server Error' 
        });

    }
}


module.exports = {
    getAllUserC,
    getUserByID,
    createNewUserC,
    updateUserC,
    deleteUserC,
    uploadUserImageIDC,
    retrieveUserImageIDC
}