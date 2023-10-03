const express = require( 'express')
const employeesBLL = require('../BLL/employeesBLL')
const jwt = require('jsonwebtoken');
const auth = require ('../middlewares/auth')


const router = express.Router()

router.get('/',auth,async(req,res) => {
    const filters = req.query
    const token = req.headers['x-access-token'];
    if (token) {
        try{  
            const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
            jwt.verify(token, ACCESS_SECRET_TOKEN)
            const employees = await employeesBLL.getAllEmployees(filters)
            res.json(employees)}
            catch (error){
              console.log(error)
            res.status(400).json('Error!')
            }
      }  else{
        res.status(401).json('No Token Provided!');
      } 
    })


router.get(('/:id'), auth, async(req,res) => {
    const {id} = req.params
    const token = req.headers['x-access-token'];
    if (token) {
      try {
        const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
        jwt.verify(token, ACCESS_SECRET_TOKEN)
        const employee = await employeesBLL.getEmployeeById(id)
        res.json(employee)
      }
      catch (error){
        res.status(400).json('Error!')
        }
      }
      else{
        res.status(401).json('No Token Provided!');
      }
})
router.put(('/:id'), auth, async(req,res) => {
    const token = req.headers['x-access-token'];
  if (token) {
   try {
    const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
    jwt.verify(token, ACCESS_SECRET_TOKEN)
    const {id} = req.params
    const obj = req.body
    console.log(obj)
    const result = await employeesBLL.updateEmployee(id,obj)
//console.log(result)
    res.status(201).json(result)
   }
   catch(error) {
    console.log(error)
    res.status(400).json('There was an error')
}
}else{
    res.status(401).json('No Token Provided!');
  }
})

router.post(('/'), auth, async(req,res) => {
    const token = req.headers['x-access-token'];
    if (token) {   
         try{
        const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
        jwt.verify(token, ACCESS_SECRET_TOKEN)
        const obj = req.body
        const result = await employeesBLL.createEmployee(obj)
       res.status(201).json(result)
      }catch(error) {
        console.log(error)
        res.status(400).json('There was an error')
    }  }else{
        res.status(401).json('No Token Provided!');
      }  
})

router.patch(('/:id'), auth, async(req,res) => {
    const token = req.headers['x-access-token'];
    if (token){
        try {
            const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
            jwt.verify(token, ACCESS_SECRET_TOKEN)
            const {id} = req.params
            const obj = req.body
            const result = await employeesBLL.updateField(id,obj)
           res.status(201).json(result)
          }
          catch(error) {
            console.log(error)
            res.status(400).json('There was an error')
        }    
    }
  
})

router.delete(('/:id'), auth, async(req,res) => {
    const token = req.headers['x-access-token'];
  if (token) {
   try {
    const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
    jwt.verify(token, ACCESS_SECRET_TOKEN)
    const {id} = req.params
    const result = await employeesBLL.deleteEmployee(id)
    res.status(201).json(result)
   }
   catch(error) {
    console.log(error)
    res.status(400).json('There was an error')
}
}else{
    res.status(401).json('No Token Provided!');
  }
})

module.exports = router