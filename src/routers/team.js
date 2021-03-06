const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Player = require('../models/player')
const authManger = require('../middleware/authManger')

//Create team
router.post('/team' , authManger, async(req, res)=>{
    const team = new Team(req.body)
    try{
        await team.save()
        res.status(201).send(team)
    } catch (e) {
        res.status(500).send(e)
    }
})

//read all team
router.get('/team', authManger, async(req, res)=>{
    try{
        const team = await Team.find({})
        res.status(200).send(team)
    } catch (e) {
        res.status(400).send(e)
    }
})

//


//Search for team
router.post('/team/search', async(req, res)=>{
    try{
        const team = await Team.findOne({_id:req.body.id})
        if(!team){
            res.status(400).send("Uncorrect id")
        }
        else 
            res.status(200).send(team)
    } catch (e) {
        res.status(500).send(e)
    }
})

//delete team 
router.delete('/team/delete', authManger, async(req, res)=>{
    try{
        const team = await Team.findOneAndDelete({id:req.body._id})
        if(!team)
            res.status(500).send("Check this Team name")
        else {
            res.status(200).send("Team Deleted Sucssfully!")
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

//update team from manager
router.patch('/team', authManger, async(req, res)=>{
    try{
        const team = await Team.findByIdAndUpdate({_id:req.body.id},{...req.body})
        res.status(200).send(team)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router