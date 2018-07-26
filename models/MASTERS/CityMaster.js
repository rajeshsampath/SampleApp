var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var schema = new Schema({
	
	cityId:{type:Number, unique:true, required:true},
	cityName:new Schema({
		en:{type:String},
		ar:{type:String}
		},{ _id : false }),
	latitude:{type:String},
	longitude:{type:String},
	provinceId:{type:Number},
	//provinceRef:{type:Schema.Types.ObjectId,ref:'provinceSchema', required:true},
	countryId:{type:Number},
	countryRef: { type: Schema.Types.ObjectId, ref:'countryMaster', required:true},
	timezone:{type:String},
	misspelled:new Schema({
		en:{type:String},
		ar:{type:String}
		},{ _id : false }),
	seoLink:{type:String},
	insertedBy:{type:String},
	insertedDate:{type:Date, default:Date.now},
	modifiedBy:{type:String},
	modifiedDate:{type:Date, default:Date.now}

},{ autoIndex: false, versionKey: false });
module.exports = mongoose.model("cityMaster", schema,'cityMaster');