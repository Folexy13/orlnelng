var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    carName : {type:String ,required:true},
    carDescription: { type: String, required: true },
    carImage: {type:String, data: Buffer, required:true},
    carImage2: {type:String, data: Buffer, required:true},
    carImage3: {type:String, data: Buffer, required:true},
    carImage4: {type:String, data: Buffer, required:true},
    carPrice : {type:String ,required:true},
    carState : {type:String ,required:true},  
    carMaker : {type:String ,required:true}, 
    carModel : {type:String, required:true} , 
    carYear: { type: String, required:true },
})



module.exports = mongoose.model('CarLog',CarSchema)
