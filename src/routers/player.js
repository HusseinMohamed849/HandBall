const express = require('express')
const router = express.Router()
const Player = require('../models/player')
const Team = require('../models/player')
const auth = require('../middleware/auth')
const authManger = require('../middleware/authManger')


//create new player
router.post('/player', authManger,  async(req,res)=>{
    const player =  new Player(req.body)
    try{
        await player.save()
        const token = await player.generateAuthtoken()
        // const team =  new Team({name:req.body.name})
        // await team.save()
        res.status(200).send({player, token})
    } catch (e) {
        console.log("error")
        res.status(500).send(e)
    }
})

//read all players
router.get('/player', authManger, async(req, res)=>{
    try{
        const player = await Player.find({})
        res.status(200).send(player)
    } catch (e) {
        res.status(400).send(e)
    }
})

// filter
// router.get('/player/filter', async(req, res) => {
//     // const match = {}
//     // if (req.query.attend) 
//     //     match.attend = req.query.attend === "true"
//     try {
//         await req.player.populate('player').execPopulate()
//         res.send(req.player)
//         console.log(req.player)
//     } catch (e) {
//         res.status(500).send(e)
//         console.log(player)
//     }
// })   

//Search for player
router.post('/player/one',authManger, async(req, res)=>{
    try{
        const player = await Player.findOne({email:req.body.email})
        res.status(200).send(player)
    } catch (e) {
        res.status(500).send(e)
    }
})

//login
router.post('/player/login', async(req, res)=>{
    try{
        const player = await Player.findByCredentials(req.body.email, req.body.password)
        const token = await player.generateAuthtoken()
        res.send({player, token})
    } catch (e) {
        res.status(500).send("Uncorrect Data")
    }
})

//delete player 
router.delete('/player/delete', authManger, async(req, res)=>{
    try{
        const player = await Player.findOneAndDelete({email:req.body.email})
        res.status(200).send(player)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Update player from manger
router.patch('/player', authManger, async(req, res)=>{
    try{
        const player = await Player.findOneAndUpdate({_id:req.body.id},{...req.body})
        res.status(200).send(player)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Update plyer
router.patch('/player/me', auth, async(req, res)=>{
    try{
        const player = await Player.findOneAndUpdate({...req.body})
        res.status(200).send(player)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router