'use strict'
/**
 * @description Product Master Controller
 * @author Rajesh Sampath
 * @return Object<Router>
 */

 var express = require('express'),
    router = express.Router(),
    config = require('config'),
    redisModule = rootRequire('lib/redisAPI');

router.get('/updateMasterKeyData', function(req, res){
	var keys = req.query.arrKeys.split(',');
    redisModule.updateMasterKeyData(keys, function(err, response){
        console.log(response);
        res.json({status:"Welcome To Redis", response: response});
    });    
});


// Export The Controller
module.exports = router;