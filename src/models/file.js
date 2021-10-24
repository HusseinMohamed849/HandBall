const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    general_instructions:{
        type:String,
        required:true,
    }, nutritional_instructions:{
        type:String,
        required:true
    }, appointments: {
        type:String,
        required:true
    }
})

const File = mongoose.model('File',fileSchema)
module.exports = File