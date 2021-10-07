const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true,
    }, age: {
        type: Number,
        required: true,
    }, gender: {
        type: String,
        required: true
    }, rate:{
        type:Number,
        required: true,
        default:0
    }, salary:{
        type:Number,
        required: true
    },  attend:{
        type:String,
        default:0
    }, address:{
        type:String,
        required: true
    }, phoneNumber:{
        type:Number,
        required: true,
        unique:true
    }
})
trainerSchema.virtual('team',{
    ref:'Team',
    localField:'name',
    foreignField:'trainer'
})

const Trainer = mongoose.model("Trainer",trainerSchema)
module.exports = Trainer