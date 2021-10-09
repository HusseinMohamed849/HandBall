const mongoose = require('mongoose')

const attendSchema = new mongoose.Schema({
    date:{
        type:String,
        required: true
    }, day:{
        type:String,
        required: true
    }, player_id:{
        type:String,
        required: true,
        ref:"Player"
    }, attend:{
        type:Boolean,
        default:1
    }
})

const Attend = mongoose.model("Attend",attendSchema)
module.exports = Attend

