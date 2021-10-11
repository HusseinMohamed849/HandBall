const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const mangerSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new error('email is unvalid')
        }
    }, password:{
        type: String,
        minLength: 7,
        required: true,
    }, name : {
        type:String,
        required: true,
    }, posstion: {
        type: String,
        required: true,
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

mangerSchema.methods.generateAuthtoken = async function () {
    const manger = this
    const token = jwt.sign({ _id: manger._id.toString() },"thisismanger")
    // res.send({user, token})
    manger.tokens = manger.tokens.concat({ token })
    await  manger.save()
    return token
}

const Manger = mongoose.model("Manger",mangerSchema)
module.exports = Manger