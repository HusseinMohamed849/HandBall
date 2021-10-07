const express = require('express')
const router = express.Router()
const Trainer = require('../models/trainer')


//create new trainer
router.post('/trainer', async(req,res)=>{
    const trainer =  new Trainer(req.body)
    try{
        await trainer.save()
        res.status(201).send(trainer)
    } catch (e) {
        res.status(500).send(e)
    }
})

//read all team
router.get('/trainer', async(req, res)=>{
    try{
        const trainer = await Trainer.find({})
        res.status(200).send(trainer)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Search for team
router.post('/trainer/search', async(req, res)=>{
    try{
        const trainer = await Trainer.findOne({name:req.body.name})
        if(!trainer)
            res.status(400).send("No trainer with this name")
        else 
            res.status(200).send(trainer)
    } catch (e) {
        res.status(500).send(e)
    }
})

//delete team 
router.delete('/trainer', async(req, res)=>{
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

//Update trainer
// router.patch('/trainer/_id' , async(req, res)=>{
//     const update = Object.keys(req.body)
//     const allowupdate =['name', 'age']
//     const isValidOperation = update.every((update)=>allowupdate.includes(update))

//     if(!isValidOperation)
//         return res.status(400).send({error:'Invalid update'})
   
//         try{
//         update.forEach((update) => req.trainer[update] = req.body[update])
//         await req.trainer.save()
//         res.send(req.trainer) 
// } catch (e) {
//     res.status(500).send(e)
// }
// })

module.exports = router;
