const express = require('express')
const router = express.Router()
const File = require('../models/file')

router.post('/file', async(req, res)=> {
    const file = new File(req.body)
    try {
        await file.save()
        res.status(200).send(file)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router