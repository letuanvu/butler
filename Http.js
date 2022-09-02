const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

class Http {
    constructor() {
        this.app = express();
        this.setup();
        Http.connectMongo().then(() => {
            this.moutRoutes();
        });
    }

    static async connectMongo() {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            mongoose.Promise = global.Promise;
            mongoose.connection.on("error", error => {
                console.log('Problem connection to the database'+error);
            });
        } catch (connectError) {
            console.error(connectError);
        }
    }

    moutRoutes() {
        this.app.use(require('./routes/indexPage'));
        this.app.use(require('./routes/loginPage'));
        this.app.use(require('./routes/cameraPage'));
        this.app.use(require('./routes/cameraAPI'));

        this.app.use(function (req, res, next) {
            next(createError(404));
        });

        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });
    }

    setup() {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");

        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cookieParser(process.env.SECRET_KEY || 'this-is-secret-key'));
        this.app.use(session({
            cookie: { maxAge: 60000 },
            secret: process.env.SECRET_KEY || 'this-is-secret-key',
            saveUninitialized: true,
            resave: false
        }));
        this.app.use(flash());

        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set('view engine', 'ejs');
        this.app.use(
            "/script-adminlte",
            express.static(path.join(__dirname, "/node_modules/admin-lte/"))
        );
    };

    getApp() {
        return this.app;
    }

}

module.exports = Http;
