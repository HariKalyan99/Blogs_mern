const AuthModel = require("../models/auth.model");
const AuthUserServices = require("./authUser.services");
const AuthUser = new AuthUserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

class AuthServices {
    encryptPassword = async(password) => {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }


    signup = async(user) => {
        try{
            const hashedPassword = await this.encryptPassword(user.password);
            const result = await AuthUser.register({...user, password: hashedPassword});
            return result;
        }catch(error){
            throw error
        }
    }

    generateToken = async(username) => {
        try{
            const paylaod = {
                username
            }
            const option = {
                expiresIn: "1hr"
            }
            const token = await jwt.sign(paylaod, SECRET_KEY, option);
            return token
        }catch(error){
            throw error
        }
    }

    verifyPassword = async(username, password) => {
        try{
            const user = await AuthUser.findUserByName(username);
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid){
                return user;
            }else{
                return null
            }
        }catch(error){
            throw error
        }
    }

    login = async(user) => {
        try{
            const {password, username} = user;
            const response = await this.verifyPassword(username, password);
            if(response){
                const token = await this.generateToken(username);
                return {
                    isLoggedIn: true,
                    token
                }
            }else{
                return {
                    isLoggedIn: false
                }
            }
        }catch(error){
            throw error;
        }
    }
}

module.exports = AuthServices;