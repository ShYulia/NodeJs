const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

const getUser = (username,email) => {
    const data = (axios.get(url + `?username=${username}&email=${email}`))
   console.log(data)
return data};



module.exports = { getUser };