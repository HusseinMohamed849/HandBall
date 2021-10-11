const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const trainerSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new error('email is unvalid')
        }
    },password:{
        type: String,
        minLength: 7,
        required: true,
    }, name : {
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
    },tokens:[{
        token:{
            type: String,
            required: true,
        }
    }]
})

// trainerSchema.virtual('teams',{
//     ref:'Team',
//     localField:'name',
//     foreignField:'Coach'
// })

//to create auth token
trainerSchema.methods.generateAuthtoken = async function () {
    const trainer = this
    const token = jwt.sign({ _id: trainer._id.toString() },"thisissecretkeyfortoken")
    // res.send({user, token})
    trainer.tokens = trainer.tokens.concat({ token })
    await  trainer.save()
    return token
}
//login
trainerSchema.statics.findByCredentials = async (email, password) =>{
    const trainer = await Trainer.findOne({email})
    if(!trainer) {
        throw new Error('Uncorrect email')
    }
    const ismatch = password === trainer.password
    if(!ismatch)
        throw new Error('Uncorrect password')
    return trainer
}  

const Trainer = mongoose.model("Trainer",trainerSchema)
module.exports = Trainer