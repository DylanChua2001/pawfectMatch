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

module.exports = {
    getAllUsersC
}