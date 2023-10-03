const Department = require('../models/departmentModel')
const Employee = require('../models/employeeModel')


const getAllEmployees = async (filters) =>{
  const result = await Employee.find(filters).populate({path:"department"}).populate({path:"shifts" ,options:{sort:{'date':-1}}})
    return(result)
}
const getEmployeeById = async (id) => {
    return  await Employee.findById(id).populate("department").populate({path:"shifts"})
}

const updateEmployee = async (id,obj) =>{
await Employee.findByIdAndUpdate(id,obj)
return 'Updated!'
}
const createEmployee = async (obj) =>{
    const employee = new Employee(obj)
    await employee.save()
    return 'Created!'
}

const deleteEmployee = async (id) => {
    await Employee.findByIdAndDelete(id)
    return 'Deleted!'
}
const updateField = async (employeeId,obj) =>{
     if(Object.keys(obj)[0] === 'shifts'){
       const shiftObj = {_id:obj.shifts}
       const isExist = await Employee.findOne({_id:employeeId, shifts:{$in: [shiftObj]}})
      if (isExist === null)
       { const update = { $push:{shifts:shiftObj}}
       await Employee.findOneAndUpdate({_id:employeeId},update )}
     }
    else {
      console.log(obj)
     await Employee.updateMany(obj,{$unset: {department: 1 }})
     await   Employee.updateOne({_id:employeeId}, obj )
     
    }
   
    return 'the shift is added'
}
module.exports = {
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    createEmployee,
    deleteEmployee,
    updateField
}