const express = require('express')
const router = express.Router()
const Subscrip = require('../models/subscription')
const Player = require('../models/player')
const authManger = require('../middleware/authManger')

router.post('/subscription',authManger, async(req, res)=>{
    const subscription = new Subscrip(req.body)
    try{
        const player = await Player.findOne({_id:req.body.player_id})
        if(!player)
            res.status(400).send("Check this id")
        else{
            await subscription.save()
            res.status(200).send(subscription)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/subscription',authManger, async(req, res)=>{
    try{
        const subscription = await Subscrip.find({})
        res.status(200).send(subscription)
    } catch(e){
        res.status(500).send(e)
    }
})

router.delete('/subscription',authManger, async(req, res)=>{
    try{
        const sub = await Subscrip.findByIdAndDelete({_id:req.body.id})
        res.status(200).send("sub is Deleted !")
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/total', async(req, res)=>{
    try{
        const subscription = await Subscrip.find({})
        res.status(200).send(subscription)
        subscription.forEach(s => console.log(s.value))
    } catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router;
