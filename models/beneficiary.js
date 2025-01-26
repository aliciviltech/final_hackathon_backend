import mongoose from "mongoose";

const beneficiarySchema = mongoose.Schema({
    name:{type:String, required:true},
    cnic:{type:Number, required:true},
    contact:{type:Number, required:true},
    address:{type:String, required:true},
    query:{type:String, required:true},
    department:{type:String, required:true},
})

const Beneficiary = mongoose.model('Beneficiary',beneficiarySchema);
export {Beneficiary}