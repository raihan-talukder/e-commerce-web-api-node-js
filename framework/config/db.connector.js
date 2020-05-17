const mongoose = require('mongoose');
const { success, error } = require("consola");
const { DB_CON } = require("../config/config");

module.exports.dbInitialize = (callback) => {
    mongoose.connect(DB_CON, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, function (err, db) {
        if (err) {
            callback(err);
            /* error({
                message: `Unable to connect with Database \n${err}`,
                badge: true
            }); */
        } else {
            /* success({
                message: `Successfully connected with the database.`,
                badge: true
            }); */
            callback(null);
        }
    });
}