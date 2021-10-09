const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Player = require('../models/player')
const auth = require('../middleware/auth')

//Create team
router.post('/team', async(req, res)=>{
    const team = new Team(req.body)
    try{
        await team.save()
        res.status(201).send(team)
    } catch (e) {
        res.status(500).send(e)
    }
})

//read all team
router.get('/team', async(req, res)=>{
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
        const team = await Team.findOne({name:req.body.name})
        res.status(200).send(team)
    } catch (e) {
        res.status(500).send(e)
    }
})

//delete team 
router.delete('/team/delete', async(req, res)=>{
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

//Update team
// router.patch('/team', auth , async(req, res)=>{
//         const update = Object.keys(req.body)
//         const allowupdate =['name', 'rate']
//         const isValidOperation = update.every((update)=>allowupdate.includes(update))
    
//         if(!isValidOperation)
//             return res.status(400).send({error:'Invalid update'})
       
//             try{
//             update.forEach((update) => req.team[update] = req.body[update])
//             await req.team.save()
//             res.send(req.team) 
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

module.exports = router