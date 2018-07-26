const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const engine = require('ejs-locals');
const mongodb = require('./config/mongodb');
const redis = require('./config/redis');
const app = express();

// Set Global app root path 
global.G_MODEL_PATH = path.join(__dirname, 'model');

global.rootRequire = function(name){
  return require(__dirname + '/' + name);
}

app.use(function (req, res, next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin','*');

  //Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

  // Set to true if you need the website to include cookies in the requestes sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(customBodyParser);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(logger('dev'));


// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Load the route index
const routes = require('./routes/index');

// Initiallize Route
routes.initialize(app);

// catch 404 and forward to error handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err); 
});

// development error handler
// will print stacktrace
if(app.get('env') === 'development'){
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/**
 *@description For Parsing XML request
 */

 function customBodyParser(req, res, next){
   let contype = req.headers['content-type'];
   req.xmlBody = '';
   if(contype === 'application/xml' || contype === 'text/xml'){
     let data = '';
     req.setEncoding('utf-8');
     req.on('data', function(chunk){
      data += chunk;
     });
     req.on('end', function(){
       req.xmlBody = data;
       next();
     });
   }else{
     next();
   }
 }

module.exports = app;