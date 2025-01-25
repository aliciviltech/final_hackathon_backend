import mongoose from "mongoose";


const testSchema = mongoose.Schema({
    title: {type:String},
    description: {type:String},
    image: {type:String}
})


const Test = mongoose.model('Test',testSchema);
export {Test}