const mongoose = require('mongoose')

const shiftSheema = new mongoose.Schema({
    date: Date,
    startHour: Number,
    endHour: Number,

})

const Shift = mongoose.model('Shift', shiftSheema)

module.exports = Shift