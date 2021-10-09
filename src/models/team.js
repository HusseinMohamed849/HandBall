const { builtinModules } = require('module')
const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    teamName : {
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
    }, Coach:{
        type:String,
        required: true,
    }, player_id:{
        type:String,
        ref:"Player"
    }, skill_Performance :{
        type:Number,
    }, physical_Performance:{
        type:Number
    }, schematic_Performance:{
        type:Number
    }, overall_Performance:{
        type:Number
    } 
})

// teamSchema.virtual('players',{
//     ref:'Player',
//     localField:'player_id',
//     foreignField:'team_id'
// })

const Team = mongoose.model("Team",teamSchema)
module.exports = Team