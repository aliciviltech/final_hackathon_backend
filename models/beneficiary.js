import mongoose from "mongoose";

const beneficiarySchema = mongoose.Schema({
    status: {type:String, required:true},
    appointmentDate: {type:Date, required:true},
    name:{type:String, required:true},
    cnic:{type:Number, required:true},
    contact:{type:Number, required:true},
    address:{type:String, required:true},
    query:{type:String, required:true},
    department:{type:String, required:true},
    priority: {type: String, enum: ['low', 'medium', 'high']},
    progress: { type: String },
    remarks: [
        {
            comment: { type: String, required: true },
            by: { type: String, required: true },
        }
    ],
    departmentOfficer : {type:String},
    isUpdated: { type: Boolean },
}, {timestamps:true})

const Beneficiary = mongoose.model('Beneficiary',beneficiarySchema);
export {Beneficiary}