const Joi = require('joi');

const authUserLoginValidator = Joi.object().keys({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().required()
})


module.exports = authUserLoginValidator;