const jwt = require('jsonwebtoken')
const Manger = require('../models/manger')


const authManger = async (req, res, next)=>{
    try{    
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,"thisismanger")
        const manger = await Manger.findOne({ _id: decode._id, 'tokens.token':token})
        if(!manger){
            throw new Error()
        }
        req.token = token
        req.manger = manger
        next()
    } catch(e) {
        res.status(401).send({error : 'Please authenticate You are not Manger'})
    }
}


module.exports =  authManger