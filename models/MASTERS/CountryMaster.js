var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var schema = new Schema({
	
	countryId:{type:Number},
	countryName:new Schema({
		en:{type:String},
		ar:{type:String}
		},{ _id : false }),
	countryCode:{type:String, required:true, maxlength:3},
	countryAreaCode:{type:String},
	seoLink:{type:String},
	insertedBy:{type:String},
	insertedDate:{type:Date, default:Date.now},
	modifiedBy:{type:String},
	modifiedDate:{type:Date, default:Date.now}

},{ autoIndex: false, versionKey: false });
module.exports = mongoose.model("countryMaster", schema,'countryMaster');