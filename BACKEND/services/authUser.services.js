const AuthModel = require("../models/auth.model")

class AuthUserServices {
    register = async(body) => {
        try{
            const user = new AuthModel({...body});
            const result = await user.save();
            return result;
        }catch(error){
            throw error
        }
    }

    findUserByName = async(username) => {
        try{
            const result = await AuthModel.findOne({username});
            return result;
        }catch(error){
            throw error
        }
    }
}


module.exports = AuthUserServices;