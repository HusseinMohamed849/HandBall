const express = require('express')
const router = express.Router()
const Trainer = require('../models/trainer')
const authManger = require('../middleware/authManger')
const authTrainer = require('../middleware/authTrainer')



//create new trainer
router.post('/trainer', authManger, async(req,res)=>{
    const trainer =  new Trainer(req.body)
    try{
        await trainer.save()
        const token = await trainer.generateAuthtoken()
        res.status(201).send({trainer, token})
    } catch (e) {
        res.status(500).send(e)
    }
})

//read all team
router.get('/trainer', authManger, async(req, res)=>{
    try{
        const trainer = await Trainer.find({})
        res.status(200).send(trainer)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Search for team
router.post('/trainer/search', authManger, async(req, res)=>{
    try{
        const trainer = await Trainer.findOne({_id:req.body.id})
        if(!trainer)
            res.status(400).send("No trainer with this name")
        else 
            res.status(200).send(trainer)
    } catch (e) {
        res.status(500).send(e)
    }
})

//delete team 
router.delete('/trainer', authManger, async(req, res)=>{
    try{
        const trainer = await Trainer.findOneAndDelete({name:req.body.name})
        if(!trainer)
            res.status(500).send("Check Trainer name")
        else {
            res.status(200).send("Trainer Deleted Sucssfully!")
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

//update form manger to any trainer
router.patch('/trainer', authManger, async(req, res)=>{
    try{
        const trainer = await Trainer.findOneAndUpdate({_id:req.body.id},{...req.body})
        res.status(200).send(trainer)
    } catch (e) {
        res.status(500).send(e)
    }
})

//update 
router.patch('/trainer/me', authTrainer ,  async(req, res)=>{
    try{
        const trainer = await Trainer.findOneAndUpdate({...req.body})
        res.status(200).send(trainer)
    } catch(e) {
        res.status(500).send(e)
    }   
})

router.post('/trainer/login', async(req, res)=>{
    try{
        const trainer = await Trainer.findByCredentials(req.body.email, req.body.password)
        const token = await trainer.generateAuthtoken()
        res.send({trainer, token})
    } catch (e) {
        res.status(500).send("Uncorrect Data")
    }
})


module.exports = router;
