const jf = require('jsonfile');
const file = './data/actions.json'
const User= require('../models/userModel')

module.exports = async function (req,res,next)  {
 const user =JSON.parse( req.headers['authorization'])
 if (user.action === true){
 let index = 0
 const data = await jf.readFile(file);
const userData = data.actions.filter(data => data.id===user.id)

//checking the date 
const today =( new Date).toString().slice(0,15)
//userData exists
if  (userData.length!==0) {
  index = userData.length -1 
  //userdata exists and last action was NOT today
if (userData[index].date.toString().slice(0,15) !== today){
  const obj = {
    id:user.id,
    maxActions:userData[index].maxActions,
    date:(new Date).toString().slice(0,15),
    actionsAllowed: userData[index].maxActions-1 
}
  data.actions.push(obj);
await jf.writeFile(file, data);
next()
} 
//data exists and last action was today
else {
 ////allowed actions = 0 && user data exists && last action was today
  if (userData[index].actionsAllowed === 0) {
    res.status(403).json('Access denied')
  } else {
    //allowed actions != 0 and data exists && las action was today

const obj = {
  id:user.id,
  maxActions:userData[index].maxActions,
  date:(new Date).toString().slice(0,15),
  actionsAllowed: userData[index].actionsAllowed - 1
}
data.actions.push(obj);
await jf.writeFile(file, data);

next()
  }
}
//user data=0
}else {
       const maxActions = await User.findOne({id:user.id}).select("actions")
     
    const obj = {
        id:user.id,
        maxActions:maxActions.actions,
        date:(new Date).toString().slice(0,15),
        actionsAllowed: maxActions.actions - 1
    }
   
      data.actions.push(obj);
    await jf.writeFile(file, data);
    next()

}
 }
 //actions = false
 else{
  next()
 }
}