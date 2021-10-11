const express = require('express')
const router = express.Router()
const Manger = require('../models/manger')

router.post('/manger', async(req, res)=>{
    const manger = new Manger(req.body)
    try{
        await manger.save()
        const token = await manger.generateAuthtoken()
        res.status(201).send({manger, token})
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/manger', async(req, res)=>{
    try{
        const manger = await Manger.find({})
        res.status(200).send(manger)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/manger/search', async(req, res)=>{
    try{
        const manger = await Manger.findOne({_id:req.body.id})
        res.status(200).send(manger)
    } catch(e) {
        res.status(500).send(e)
    }
})

//login
router.post('/manger/login', async(req, res)=>{
    try{
        const manger = await Manger.findByCredentials(req.body.email, req.body.password)
        const token = await manger.generateAuthtoken()
        res.send({manger, token})
    } catch (e) {
        res.status(500).send("Uncorrect Data")
    }
})

module.exports = router