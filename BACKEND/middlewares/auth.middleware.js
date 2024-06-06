
const validateAuthSignupMiddleware = (schema) => (request, response, next) => {
    const {error} = schema.validate(request.body);

    if(error){
        return response.status(422).json({message: error.message});
    }

    next();
}

module.exports = validateAuthSignupMiddleware;