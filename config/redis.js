/**
 *Set Redis URL based on Environment
 */
const config = require('config');

/**
 *Initiate Redis Connection
 */
var REDISURI = config.get('redisURL');
var redis = require('redis'),
    client = redis.createClient(6379,REDISURI, {no_ready_check: true});

client.auth(REDISURI, function (err) {
    if (err) throw err;
});

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on('connect', function() {
    console.log('redis connected');
});

exports.client=client;