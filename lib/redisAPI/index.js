const Models = rootRequire('models/index');
let _ = require('lodash');
var async = require('async');
var unicode = require('jsesc');
var redis = rootRequire('config/redis');

exports.updateMasterKeyData = function(keys, callback) {
	var arr = [];

	if (keys.length > 0) {
		for (var i in keys) {
			var keyValue = keys[i];
			if (keyValue == "airport") {
                var airports = function(callback) {
                    importAirports(callback);
                };
                arr.push(airports);
            }
		}
		 if (arr.length > 0) {
            async.parallel(arr, function() {
                // console.log('Update Master data Completed');
                //log.info('Update Master data Completed');
            });
        }
        callback(null, null);
	}
}

function importAirports(callback) {

    Models['MASTERS.AirportMaster'].find({}, 'airportCode airportName latitude longitude cityRef countryRef airportId').populate('cityRef countryRef').exec(function(err, airportData) {
        if (err) {
            // console.log("airportData:" + err);
            //log.error("airportData:" + err);
            cb();
            return
        } else {
            //console.log('airportData data size:' + airportData.length);
            //log.info('airportData data size:' + airportData.length);
            for (var val in airportData) {
                //existingAirports.push(airportData[val].airportCode);
                var data = {
                    name: {
                        en: airportData[val].airportName.en,
                        ar: (airportData[val].airportName.ar != null) ? unicode(airportData[val].airportName.ar) : airportData[val].airportName.en
                    },
                    cityName: {
                        en: (airportData[val].cityRef != null) ? airportData[val].cityRef.cityName.en : "",
                        ar: (airportData[val].cityRef != null) ? ((airportData[val].cityRef.cityName.ar != null) ? unicode(airportData[val].cityRef.cityName.ar) : airportData[val].cityRef.cityName.en) : "",
                        id: (airportData[val].cityRef != null) ? airportData[val].cityRef.cityId : "",
                    },
                    countryName: {
                        en: (airportData[val].countryRef != null) ? airportData[val].countryRef.countryName.en : "",
                        ar: (airportData[val].countryRef != null) ? ((airportData[val].countryRef.countryName.ar != null) ? unicode(airportData[val].countryRef.countryName.ar) : airportData[val].countryRef.countryName.en) : ""
                    },
                    countryCode: (airportData[val].countryRef != null) ? airportData[val].countryRef.countryCode : "",
                    airportgeoCode: {
                        latitude: airportData[val].latitude,
                        longitude: airportData[val].longitude
                    },
                    airportId: airportData[val].airportId
                };
                redis.client.hmset('airports', airportData[val].airportCode, JSON.stringify(data));
            }
            // console.log('airportData imported successfully');
            log.info('airportData imported successfully');
            cb();
        }
    });
}