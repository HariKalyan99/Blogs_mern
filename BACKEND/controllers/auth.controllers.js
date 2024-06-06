const AuthServices = require("../services/auth.service");
const Auth = new AuthServices();

const postSignup = async(request, response) => {
    try{
        const result = await Auth.signup({...request.body});
        return response.status(200).json(result);
    }catch(error){
        return response.status(422).json({message: error.message})
    }
}

const postLogin = async(request, response) => {
    try{    
        const result = await Auth.login({...request.body});
        if(result.isLoggedIn){
            response.cookie("remember_token", result.token, {
                maxAge: 60*60*1000,
                httpOnly: true
            })
            return response.status(200).json(result);
        }else{
            return response.json({message: "Invalid credentials"})
        }
    }catch(error){
        return response.status(422).json({message: error.message})
    }
}

module.exports = {postSignup, postLogin};