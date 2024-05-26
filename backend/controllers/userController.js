const userModel = require("../models/userModel")

const getAllUsersC = async(req,res,next) => {
    try{
        const allUsers  = await userModel.getAllUsersM()
        res.json(allUsers)
    }
    catch (error){
        next(error)
    }
}

const createNewUserC = async (req, res, next) => {
    try{
        const newUser = await userModel.createNewUsersM(req.body)
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
    try{
        const updateUser = await userModel.updateUserM(req.body)
        if (updateUser){
            res.status(200).json({
                message : "User Data Updated Successfully",
                user : updateUser
            })
        }
        else{
            res.status(404).json({
                message : 'User not found'
            })
        }
    }
    catch(error){
        next(error)
    }
}

const deleteUserC = async (req, res, next) => {
    try{
        const deleteUser = await userModel.deleteUserM(req.body)
        if(deleteUser){
            res.status(200).json({
                message : "User Data Deleted Successfully"
            })
        }
        else{
            res.status(404).json({
                message : "User Data Not Found"
            })
        }
    }
    catch{
        next(error)
    }
}


module.exports = {
    getAllUsersC,
    createNewUserC,
    updateUserC,
    deleteUserC
}