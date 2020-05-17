const VerifyAuthMiddleware = require('./middlewares/verify.auth.middleware');
const AuthorizationController = require('./controllers/authorization.controller');

module.exports.routesConfig = function (app) {

    app.post('/auth/Login', [
        VerifyAuthMiddleware.hasValidAuthFields,
        AuthorizationController.login
    ]);

    /* app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]); */
};