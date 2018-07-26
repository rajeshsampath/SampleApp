var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var schema = new Schema({
    airportCode:{type:String, required:'Airport Code is required'},
    airportName:new Schema({    	
    	en:{type:String},
    	ar:{type:String}
       },{ _id : false}),
    cityId:{type:Number},
    airportId:{type:String},
    cityCode:{type:String},
    provinceId:{type:Number},
    provinceRef:{type:Schema.Types.ObjectId,ref:'provinceSchema'},
    cityRef: { type: Schema.Types.ObjectId, ref:'cityMaster', required:true},
    countryId:{type:Number},
    countryRef: { type: Schema.Types.ObjectId, ref:'countryMaster', required:true},
    enabled:{type:Boolean, default:true},
    insertedBy:{type:String},
    insertedDate:{type:Date, default: Date.now},
    modifiedBy:{type:String},
    modifiedDate:{type:Date, default: Date.now},   
    isDomestic:{type:Boolean},
    isInterNational:{type:Boolean},
    isLowfare:{type:Boolean},
    latitude:{type:String},
    longitude:{type:String}
},{ autoIndex: false, versionKey: false });


module.exports = mongoose.model("airportMaster", schema,'airportMaster');
