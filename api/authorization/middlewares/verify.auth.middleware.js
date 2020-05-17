module.exports.hasValidAuthFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.Email) {
            errors.push(`"Email" is required!`);
        }
        if (!req.body.Password) {
            errors.push(`"Password" is required!`);
        }
        if (errors.length) {
            return res.status(400).json({
                HasError: true,
                Results: null,
                Message: errors,
            });
        } else {
            return next();
        }
    } else {
        return res.status(400).json({
            HasError: true,
            Results: null,
            Message: [`"Email" and "Password" are required!`],
        });
    }
}
