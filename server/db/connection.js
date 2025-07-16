const mongoose = require('mongoose');

require('dotenv').config(mongoose.connection)
// connecting db
mongoose.connect()
    // 'process.env.MONGODB_URL')
    .then(()=>{
    console.log('Connection established')
}).catch(()=>{
console.log('connection error')
})