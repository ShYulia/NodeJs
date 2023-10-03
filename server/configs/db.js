const mongoose = require ('mongoose')



const connectDB = () => {
    mongoose
    .connect('mongodb://localhost:27017/factoryDB')
    .then( () => console.log('Connected to factoryDB'))
    .catch((error) => console.log(error , 'Error'))

  
   
}
module.exports = connectDB 