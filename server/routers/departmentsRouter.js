const express = require('express')
const departmentsBLL = require ('../BLL/departmentsBLL')
const jwt = require('jsonwebtoken');
const auth = require ('../middlewares/auth')

const router = express.Router()

router.get(('/'), auth, async (req,res) => {
    const token = req.headers['x-access-token'];
    if (token) {
        try{
            const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
            jwt.verify(token, ACCESS_SECRET_TOKEN)
            const data = await departmentsBLL.getAllDepartments()
           res.status(201).json(data)
        } catch(err){
            console.log(err)
            res.status(400).json('Error!')
        }}
        else { res.status(401).json('No Token Provided!')}

})

router.get(('/:id'), auth, async(req,res) => {

    const token = req.headers['x-access-token'];
    if (token) {
        try{
            const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
            jwt.verify(token, ACCESS_SECRET_TOKEN) 
            const {id} = req.params
            const department = await departmentsBLL.getDepartmentById(id)
            res.status(201).json(department)
        }catch(err){
            res.status(400).json('Error!')
        }
      } else {res.status(401).json('No Token Provided!')}  
})

router.put(('/:id'), auth, async(req,res) => {
    const token = req.headers['x-access-token'];
    if (token) {
        try{
            const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
            jwt.verify(token, ACCESS_SECRET_TOKEN) 
            const {id} = req.params
            const obj = req.body
            console.log(obj,'hahaha')
            const result = await departmentsBLL.updateDepartment(id,obj)
            res.status(201).json(result) 
        }catch(err){
            console.log(err)
            res.status(400).json('Error!')
        }
      } else{res.status(401).json('No Token Provided!')} 
})
router.delete(('/:id'), auth, async(req,res) => {
    const token = req.headers['x-access-token'];
  if (token) {
   try {
    const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
    jwt.verify(token, ACCESS_SECRET_TOKEN)
    const {id} = req.params
    const result = await departmentsBLL.deleteDepartment(id)
    res.status(200).json(result)
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
        const result = await departmentsBLL.createDepartment(obj)
        console.log(result)
       res.status(201).json(result)
      }catch(error) {
        console.log(error)
        res.status(400).json('There was an error')
    }  }else{
        res.status(401).json('No Token Provided!');
      }  
})
module.exports = router