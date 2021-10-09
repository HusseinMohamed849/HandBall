const mongoose = require('mongoose')
const validator = require('validator')

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
        type:Boolean,
        default:0
    }, address:{
        type:String,
        required: true
    }, phoneNumber:{
        type: String,
        unique: true,
        minLength:11,
        maxLength:11,
        validate(value){
            if(!validator.isInt(value))
                throw new Error('phone number is only number')
        }, validate(value){
            if(!validator.isMobilePhone(value,'ar-EG'))
                throw new Error('check your phone number')
        }
    }
})

// trainerSchema.virtual('teams',{
//     ref:'Team',
//     localField:'name',
//     foreignField:'Coach'
// })

const Trainer = mongoose.model("Trainer",trainerSchema)
module.exports = Trainer