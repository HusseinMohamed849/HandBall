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
        required: true,
        ref:"Player"
    }, payed:{
        type:Boolean,
        default:0
    }
})

const Subscrip = mongoose.model("Subscrip",subscriptionSchema)
module.exports = Subscrip

