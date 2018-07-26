// Including Mogoose into the app
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('config');

/**
 * Set MongoDB URL based on Environment
 **/

var DBURI = config.get('mongoDBURL');

//Create the database connection
mongoose.connect(DBURI, function(error){
    if(error){
        console.log(error);
    }
});

// CONNECTION EVENTS
// When Successfully connected
mongoose.connection.on('connected', function(){
    console.log('Mogoose Default Connection Open To '+ DBURI);
});

// If the connection throws an error
mongoose.connection.on('error', function(err){
    console.log('Mongoose Default Connection Error: '+ err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose Default Connection Disconnected');
});

// If the Node process ends, close the mongoose connection
process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    })
})