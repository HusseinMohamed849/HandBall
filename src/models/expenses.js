const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    }, date:{
        type:String,
        required: true
    }, value:{
        type:Number,
        required: true,
    }, Note:{
        type:String,
    }
})

const Expenses = mongoose.model("Expenses",expensesSchema)
module.exports = Expenses

