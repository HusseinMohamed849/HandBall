const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    date:{
        type:String,
        required: true
    }, day:{
        type:String,
        required: true
    }, player_id:{
        type:String,
        unique: true,
        required: true,
        ref:"Player"
    }, value:{
        type:Number,
        required: true
    }
})

const Subscrip = mongoose.model("Subscrip",subscriptionSchema)
module.exports = Subscrip

