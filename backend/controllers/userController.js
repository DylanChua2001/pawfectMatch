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
        res.status(201).json(newUser)
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    getAllUsersC,createNewUserC
}