const Joi = require('joi');

const authSignUpValidator = Joi.object().keys({
    fullname: Joi.string().required().max(50),
    username: Joi.string().required().min(3).max(50),
    password: Joi.string().required(),
    email: Joi.string().required().email({tlds: {allow: false}})
})


module.exports = authSignUpValidator;