const express = require('express')
const router = express.Router()
const Expenses = require('../models/expenses')
const authManger =require('../middleware/authManger')

router.post('/expenses', authManger,async(req, res)=>{
    const expenses = new Expenses(req.body)
    try{
        await expenses.save()
        res.status(500).send(expenses)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/expenses', authManger, async(req, res)=>{
    try{
        const expenses = await Expenses.find({})
        res.status(200).send(expenses)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.delete('/expenses', authManger, async(req, res)=>{
    try{
        const expenses = await Expenses.findOneAndDelete({_id:req.body.id})
        res.status(200).send('expenses deleted sucssfully!')
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/expenses', authManger, async(req, res)=>{
    try{
        const expenses = await Expenses.findOneAndUpdate({_id:req.body.id},{...req.body})
        res.status(200).send(expenses)
    } catch(e) {
        res.status(500).send(e)
    }
})

//to total expenses
router.get('/total/expenses', async(req, res)=>{
    try{
        const expenses = await Expenses.find({})
        res.status(200).send(expenses)
        expenses.forEach(t => console.log(t.value))
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router