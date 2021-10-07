const express = require('express')
const router = express.Router()
const Player = require('../models/player')
const auth = require('../middleware/auth')

//create new player
router.post('/player', async(req,res)=>{
    const player =  new Player(req.body)
    try{
        await player.save()
        const token = await player.generateAuthtoken()
        res.status(201).send({player, token})
    } catch (e) {
        console.log("error")
        res.status(500).send(e)
    }
})

//read all players
router.get('/player', async(req, res)=>{
    try{
        const player = await Player.find({})
        res.status(200).send(player)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Search for player
router.post('/player/one', async(req, res)=>{
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
router.delete('/player/delete', async(req, res)=>{
    try{
        const player = await Player.findOneAndDelete({email:req.body.email})
        res.status(200).send(player)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Update player
// router.patch('/player/me', auth, async(req, res)=>{
//     try{
//         const update = Object.keys(req.body)
//         const allowupdate =['name', 'email', 'phoneNumber','password','birthdate']
//         const isValidOperation = update.every((update)=>allowupdate.includes(update))
    
//         if(!isValidOperation)
//             return res.status(400).send({error:'Invalid update'})
//         try{
//             // const user = await User.findByIdAndUpdate(req.params.id)
            
//             update.forEach((update) => req.player[update] = req.body[update])
//             await req.player.save()
//             res.send(req.player)
            
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
module.exports = router