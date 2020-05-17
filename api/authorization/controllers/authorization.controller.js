const VerifyInputDataMiddleware = require('../../../framework/middlewares/data.validation.middleware')
const ValidationSchema = require('../../../framework/validation.schemas/auth.input.validation.schema')
const ApiResponse = require('../../../framework/core/objects/ApiResponse')

module.exports.login = (req, res) => {
    try {
        VerifyInputDataMiddleware.isInputDataValid(req.body, ValidationSchema.authInputSchema , (errs, results) => {
            if (errs) {
                return res.status(422).json(
                    new ApiResponse (true, null, errs)
                );
            }

            return res.status(200).json(
                new ApiResponse (false, results, null)
            );
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(
            new ApiResponse (true, null, ['Something went wrong on server. Please try again later.'])
        );
    }
};