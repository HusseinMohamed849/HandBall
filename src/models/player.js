const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const playerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },email:{
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
    }, birthdate:{
        type: String,
        required: true,
        default: 0,
        lastActiveAt: true
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
    },gender:{
        type:String,
        require: true,
    },avatar:{
        type:String,
        default:null,
    },tokens:[{
        token:{
            type: String,
            required: true,
        }
    }],avatar:{
        type:String,
    }
},{
    timestamps:true
})

//to create auth token
playerSchema.methods.generateAuthtoken = async function () {
    const player = this
    const token = jwt.sign({ _id: player._id.toString() },"thisissecretkey")
    // res.send({user, token})
    player.tokens = player.tokens.concat({ token })
    await  player.save()
    return token
}
// login check
playerSchema.statics.findByCredentials = async (email, password) =>{
    const player = await Player.findOne({email})
    if(!player) {
        throw new Error('Uncorrect email')
    }
    const ismatch = password === player.password
    if(!ismatch)
        throw new Error('Uncorrect password')
    return player
}  

const Player = mongoose.model('Player', playerSchema)

module.exports = Player