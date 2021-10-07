const { builtinModules } = require('module')
const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true,
    }, yearOfBirth: {
        type: Number,
        required: true,
    }, gender: {
        type: String,
        required: true
    }, rate:{
        type:Number,
        default:0
    }
})

const Team = mongoose.model("Team",teamSchema)
module.exports = Team