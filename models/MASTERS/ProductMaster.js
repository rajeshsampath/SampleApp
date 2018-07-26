/**
 *@description ProductMaster User Model
*@author Nahl , HariKrishna, Rajesh, Aashick, Rupam
*@return Object<Schema>
*/
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
let schema = new Schema({
    PRODUCT_ID: { type: Number, unique: true, required: true },
    PRODUCT_TYPE: { type: String, required: true },
    DELETE_STATE: { type: Boolean, default: false},
    CREATED_DATE : { type: Date, default:Date.now() }, 
    LAST_MODIFIED_DATE : { type: Date, default:Date.now() }
}, { autoIndex: true, versionKey: false })


// Get Product Count
schema.statics.getProductCount = function(critria, cb){
    let _self = this;
    _self.count(critria, (err, count) => {
        if(count && !err){
            return cb(count)
        }else{
            return cb({status:"ERROR", response: err})
        }
    })
}
//  Get all the products
schema.statics.getProducts = function(critria,perPage, page, cb){
    let _self = this;
    _self.find(critria)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, docs) => {
            if (docs && !err) {
                return cb(docs)
            }else{
                return cb({status:"ERROR", response: err})
            }
    });
}
schema.statics.updateProductById = function(data, cb){
    let _self = this;
    _self.findOne({_id:data.id},(err, product) => {
        if(err) return cb({status: types.ERROR, message:types.RECORD_NOT_FOUND});
        product.PRODUCT_ID = data.product_id;
        product.PRODUCT_TYPE = data.product_type;
        product.save();
        return cb({status:types.SUCCESS, message: types.RECORD_UPDATE_SUCCESS});
    });
}
schema.statics.deleteProductById = function(data, cb){
    let _self = this;
    _self.findOne({_id:data.id},(err, product) => {
        if(err) return cb({status: types.ERROR, message:types.RECORD_NOT_FOUND});
        product.DELETE_STATE = !product.DELETE_STATE;
        product.save();
        return cb({status:types.SUCCESS, message: types.RECORD_UPDATE_SUCCESS});
    });
}
//  Get product by id
schema.statics.getProductById = function(id,cb){
    let _self = this;
    _self.findOne({PRODUCT_ID:id},(err, doc) => {
        if (doc && !err) {
            return cb(doc)
        }else{
            return cb({status:"ERROR", response: err})
        }
    })
}

//  Get product by id
schema.statics.addProduct = function(req, cb){
    let _self = this;
    
    let p = new _self({
        PRODUCT_ID: req.body.product_id,
        PRODUCT_TYPE: req.body.product_type
    });
    p.save(function(err){
        if(err) return cb({status: types.ERROR, message:types.ERROR_WHILE_SAVING});
        return cb({status:types.SUCCESS, message: p});
    });
}
module.exports = mongoose.model("ProductMaster", schema, "ProductMaster")