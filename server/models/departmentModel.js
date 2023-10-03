const mongoose = require('mongoose')

const departmentSheema = new mongoose.Schema({
    name: String,
    manager: {type:mongoose.Schema.Types.ObjectId, ref:'Employee'}, 

})

const Department = mongoose.model('Department', departmentSheema)

module.exports = Department