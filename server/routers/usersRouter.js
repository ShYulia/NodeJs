
const express = require( 'express')
const usersBLL = require('../BLL/usersBLL')
const jwt = require('jsonwebtoken');
const auth = require ('../middlewares/auth')
const router = express.Router()



router.get(('/'), auth, async(req,res) => {
    const token = req.headers['x-access-token'];
  
    if (token) {
        try{  
            const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
            jwt.verify(token, ACCESS_SECRET_TOKEN)
            const users = await usersBLL.getAllUsers()
            res.json(users)}
            catch (error){
            res.status(400).json('Error!')
            }
      }  else{
        res.status(401).json('No Token Provided!');
      } 

})

module.exports = router