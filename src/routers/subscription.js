const express = require('express')
const router = express.Router()
const Subscrip = require('../models/subscription')

router.post('/subscription', async(req, res)=>{
    const subscription = new Subscrip(req.body)
    try{
        await subscription.save()
        res.status(200).send(subscription)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/subscription', async(req, res)=>{
    try{
        const subscription = await Subscrip.find({})
        res.status(200).send(subscription)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;
