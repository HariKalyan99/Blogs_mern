const { postSignup,postLogin } = require('../controllers/auth.controllers');
const validateAuthSignupMiddleware = require('../middlewares/auth.middleware');
const authLoginUserMiddleware = require('../middlewares/authLogin.middleware');
const authSignUpValidator = require('../validators/auth.validators');
const authUserLoginValidator = require('../validators/authLogi.validators');
const authRoutes = require('express').Router();
const signupValidation = validateAuthSignupMiddleware(authSignUpValidator)
const loginValidation = authLoginUserMiddleware(authUserLoginValidator);

authRoutes.post("/signup",signupValidation, postSignup);
authRoutes.post("/login",loginValidation, postLogin);


module.exports = authRoutes;