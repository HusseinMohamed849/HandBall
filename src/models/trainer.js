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
        default:1
    }
})

const Trainer = mongoose.model("Trainer",trainerSchema)
module.exports = Trainer