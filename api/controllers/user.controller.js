const { userRegistrationSchema } = require('../../framework/validation.schemas/user.registration.validation.schema')
const DataValidationMiddleware = require('../../framework/middlewares/data.validation.middleware')

module.exports = {
    createUser: (req, res) => {
        DataValidationMiddleware.isInputDataValid(req.body, userRegistrationSchema, (err, results) => {
            if (err) {
                return res.status(422).json({
                    HasError: true,
                    Results: null,
                    Error: {
                        Messages: err,
                    },
                });
            }
            return res.status(200).json({
                HasError: false,
                Results: results,
                Error: {},
            });
        });
    },
};