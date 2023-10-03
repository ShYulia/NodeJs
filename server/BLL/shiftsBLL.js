
const Shift = require('../models/shiftModel')

const addShift = async (obj) =>{
    console.log(obj,'in BLL')
    const shift = new Shift(obj)
  await shift.save()
  return 'Created!'

}

const getAllShifts = () => {
     return (Shift.find({}))
}

const updateShift = async (id,obj) => {
 await Shift.findByIdAndUpdate(id,obj)
 return 'Updated!'
}
 
module.exports = {
addShift,
getAllShifts,
updateShift
}