const express = require( 'express')
const shiftsBLL = require('../BLL/shiftsBLL')
const jwt = require('jsonwebtoken');
const auth = require ('../middlewares/auth')
const router = express.Router()

router.post(('/'),auth, async(req,res) => {
    const token = req.headers['x-access-token']
    const obj = req.body
    
    if (token){
        try{
            const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY
            jwt.verify(token, ACCESS_SECRET_TOKEN)
            const result = await shiftsBLL.addShift(obj)
            res.status(201).json(result)
        } catch (error){
            res.status(400).json('Error!')
            }
    }else {  res.status(401).json('No Token Provided!')}
})

router.get(('/'), auth, async(req,res) => {
    const token = req.headers['x-access-token']
    if (token){
        try{
            const result = await shiftsBLL.getAllShifts()
            res.status(201).json(result)
        }catch(error){
            res.status(400).json('Error!')
        }
    }else{
        res.status(401).json('No Token Provided!')  
    }
})

router.put(('/:id'),auth, async(req,res) => {
    const {id} = req.params
    const obj = req.body
    const token = req.headers['x-access-token']
    if (token){
        try{
            const result = await shiftsBLL.updateShift(id,obj)
            console.log(result)
            res.status(201).json(result)
        }
        catch(error) {
            res.status(400).json('Error!')
        }
    }else{
        res.status(401).json('No Token Provided!')  
    }
})

module.exports = router