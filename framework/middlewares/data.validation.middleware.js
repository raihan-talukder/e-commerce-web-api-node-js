const Joi = require("@hapi/joi");
module.exports.isInputDataValid = (data, schema, callback) => {
    try {
        const { error, value } = Joi.validate(data, schema, { abortEarly: false });
        const valid = error == null;

        if (valid) {
            callback(null, value);
        } else {
            const { details } = error;
            const messages = details.map(i => i.message);
            callback(messages);
        }
    } catch (err) {
        callback(['Something went wrong on server. Please try again later.']);
    }
};