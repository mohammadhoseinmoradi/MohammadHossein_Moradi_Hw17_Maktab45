const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config({ path: 'ENV_FILENAME' });
const Company_Router = require('./routes/Company');
const Employee_Router = require('./routes/Employee');


const app = express();


mongoose.connect(
    'mongodb://localhost:27017/Company_hw17', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/public/javascripts/Company.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/javascripts/Company.js'));
})

// app.use('/', (req, res) => {
//     res.render('Company')
// })
app.use('/Company', Company_Router);
app.use('/Employee', Employee_Router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;