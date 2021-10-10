const express = require('express')
const router = express.Router()
const Question = require('../models/question')

router.post('/question', async(req, res)=>{
    const question = new Question(req.body)
    try{
        await question.save()
        res.status(200).send(question)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/question', async(req, res)=>{
    try{
        const question = await Question.find({})
        res.status(200).send(question)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/question', async(req, res)=>{
    try{
        const question = await Question.findOneAndDelete({_id:req.body.id})
        res.status(200).send("question is deleted sucssfully !")
    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router