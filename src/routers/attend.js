const express = require('express')
const router = express.Router()
const Attend = require('../models/attend')
const authManger = require('../middleware/authManger')

router.post('/attend', authManger, async(req, res)=>{
    const attend = new Attend(req.body)
    try{
        await attend.save()
        res.status(200).send(attend)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/attend', authManger, async(req, res)=>{
    try{
        const attend = await Attend.find({})
        res.status(200).send(attend)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;
