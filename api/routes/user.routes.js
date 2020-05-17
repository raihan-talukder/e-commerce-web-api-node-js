const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const VerifyAppKeyMiddleware = require('../../framework/middlewares/verify.appkey.middleware');

router.post("/Register",[VerifyAppKeyMiddleware.hasValidAppKey, UserController.createUser]);

module.exports = router;