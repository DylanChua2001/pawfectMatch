const userModel = require("../models/userModel")

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


module.exports = {
    getAllUserC,
    getUserByID,
    createNewUserC,
    updateUserC,
    deleteUserC
}