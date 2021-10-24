const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required: true,
    }, answer:{
        type:String
    }
})

const Question =  mongoose.model('Question',questionSchema)
module.exports = Question