const express = require('express')
const router = express.Router()
const Player = require('../models/player')
const auth = require('../middleware/auth')
const Post = require('../models/post')


router.post('/post',auth , async(req, res)=>{
    const posts = new Post({
        ...req.body,
        owner: req.player.id
    })
    try{    
        await posts.save()
        res.status(200).send(posts)
    } catch (e) {
        console.log("error")
        res.status(500).send(e)
    }
})

router.get('/post', async(req, res)=>{
    try{
        const posts = await Post.find({})
        res.status(200).send(posts)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.delete('/post', async(req, res)=>{
    try{    
        const posts = await Post.findOneAndDelete({_id:req.body.id})
        res.status(200).send("Post has deleted sucssufly!")
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router