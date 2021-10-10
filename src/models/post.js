const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description:{
        type:String,
        required: true,
    }, owner:{
        // type:mongoose.Schema.Types.ObjectID,
        type:String,
        ref:'Player'
    }
    , image:{
        type:String,
    }
}, {
    timestamps: true
})

const Post =  mongoose.model('Post',postSchema)
module.exports = Post