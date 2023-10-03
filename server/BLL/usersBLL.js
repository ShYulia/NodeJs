const usersWS = require("../DAL/usersWS")
const User= require('../models/userModel')
const jf = require('jsonfile');
const file = './data/actions.json'

const getUser = async (username, email) => {
  const res = await usersWS.getUser(username, email)
  if (res.data.length===0) return "error"
  else {
    const id = String (res.data[0].id)
    const user = await User.findOne({"id":id})
  const userData = {
    id:id,
    name: user.name,
    actions:user.actions
  }
    return userData;
  }  
}
const getAllUsers = async () => {
  let users = []
 const result =await User.find({})
 const data = await jf.readFile(file)
 result.forEach(res => {
  const userData = data.actions.filter(user => user.id===res.id)
  if(userData.length===0){
     const obj = {
    name:res.name,
    id:res.id,
    max:res.actions,
    allowed:res.actions
  }
  users.push(obj)
  }else { 
     const index = userData.length-1
    const obj = {
      name:res.name,
      id:res.id,
      max:res.actions,
      allowed:userData[index].actionsAllowed
    }
  users.push(obj)}
 })

 return users
}
  



module.exports = { getUser, getAllUsers}
