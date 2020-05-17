const Joi = require("@hapi/joi");
const pattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{7,10}$/;
module.exports.authInputSchema = Joi.object().keys({
    Email: Joi.string().email().required().trim(),
    Password: Joi.string().trim().required().regex(pattern).error(errors => {
        return errors.map(err => {
            console.log(err)
         switch (err.type) {
            case "string.regex.base":
              return { message: "\"Password\" must contain at least 1 lowercase alphabetical character\\n" + 
              "\"Password\" must contain at least 1 uppercase alphabetical character\\n" +
              "\"Password\" must contain at least 1 uppercase alphabetical character\\n" +  
              "\"Password\" must contain at least 1 numeric character\\n" + 
              "\"Password\" must contain at least one special character.\\n" + 
              "\"Password\" must be at least 7 and at most 10 characters longer." };
            case "any.required":
              return { message: `"Password" is a required.` };
         }
      });
    }),
});