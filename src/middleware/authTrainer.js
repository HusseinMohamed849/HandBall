const jwt = require('jsonwebtoken')
const Trainer = require('../models/trainer')


const authTrainer = async (req, res, next)=>{
    try{    
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,"thisissecretkeyfortoken")
        const trainer = await Trainer.findOne({ _id: decode._id, 'tokens.token':token})
        if(!trainer){
            throw new Error()
        }
        req.token = token
        req.trainer = trainer
        next()
    } catch(e) {
        res.status(401).send({error : 'Please authenticate'})
    }
}


module.exports =  authTrainer