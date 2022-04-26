const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
var server = http.createServer(app).listen(3000); //if you want it to get port automatically, delete port 3000.
const UserModel = require('./Database/Mongoose');
var mongoose = require('mongoose')

require('./Auth/Auth');

mongoose.connect(require('./config.json').mongodb.url);
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

//Web Server Config

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.enable('trust proxy');

//Middlewares
const session = require('express-session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

var sessionOptions = {
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    //store: sessionStore /* Recommend you to set store in session*/
};

app.use(session(sessionOptions));
app.use(helmet({contentSecurityPolicy: false}));
app.use(cookieParser());
app.use(compression());
app.use(cors());

//Routes

const apiRoutes = require('./Routers/Api');
const indexRoutes = require('./Routers/Index');

app.use('/api/v1',apiRoutes);
app.use('/',passport.authenticate('jwt', { session: false }),indexRoutes);

