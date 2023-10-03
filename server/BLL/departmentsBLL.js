const Department = require('../models/departmentModel')
const Employee = require('../models/employeeModel')

const getAllDepartments = () => {
  return Department.find({}).populate({path:'manager'})
}

const getDepartmentById = (id) => {
    return Department.findById(id).populate({path:'manager'})
}

const updateDepartment = async (id,obj) =>{
  await Department.findByIdAndUpdate(id,obj)
     return 'Updated!'
    }

    const deleteDepartment = async (id) => {
      await Department.findByIdAndDelete(id)
      await Employee.updateMany({"department": id},
      {$unset: {department: 1 }})
      return 'Deleted!'
  }

  const createDepartment = async (obj) =>{
    const department = new Department(obj)
    await department.save()
    return 'Created!'
}
module.exports = {getAllDepartments,
getDepartmentById,
updateDepartment,
deleteDepartment,
createDepartment}