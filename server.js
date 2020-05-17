//Fast, unopinionated, minimalist web framework for node
const express = require('express')
//Elegant Console Logger for Node.js 
const { success, error } = require('consola')
//HTTP request logger middleware for node.js
const morgan = require('morgan');
// Use to enable CORS support in Express
const cors = require("cors");

//Custom Library
// This will verify appkey from Request Headers
const VerifyAppKeyMiddleware = require('./framework/middlewares/verify.appkey.middleware');
const DbConnector = require('./framework/config/db.connector')
const { PORT } = require('./framework/config/config')

//Custom Api Response 
const ApiResponse = require('./framework/core/objects/ApiResponse')

// Api Router
const AuthRouteConfig = require('./api/authorization/routes.config')
const UserRoute = require('./api/routes/user.routes');

// Initialize the application
const app = express();
const port = PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(cors()); */
app.use(morgan('dev'));
// Cors Enable
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});


// Set API Route Config
AuthRouteConfig.routesConfig(app);
app.use("/api/users", UserRoute);

app.get('/', VerifyAppKeyMiddleware.hasValidAppKey, function (req, res) {
    let response = new ApiResponse(false, { Data: 'Welcome to Adan-Prodan.Com' });
    res.status(200).json(response);
});

// Error Handler
app.use((req, res, next) => {
    const error = new Error('The resource referenced by request does not exists.');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    let response = new ApiResponse(true, null, [error.message]);
    res.json(response);
});

// App start
const startApp = async () => {
    try {
        // Connection With DB
        await DbConnector.dbInitialize((error, done) => {
            if (error) {
                error({
                    message: `Unable to connect with Database \n${error}`,
                    badge: true
                });
            } else {
                success({
                    message: `Successfully connected with the database.`,
                    badge: true
                });

                // Start Listenting for the server on PORT
                app.listen(port, () =>
                    success({ message: `Server started on PORT ${port}`, badge: true })
                );
            }
        });
    } catch (err) {
        error({
            message: `Unable to connect with Database \n${err}`,
            badge: true
        });
    }
};

/* startApp(); */

// Start Listenting for the server on PORT
app.listen(port, () =>
success({ message: `Server started on PORT ${port}`, badge: true })
);