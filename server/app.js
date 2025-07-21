const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./db/connection');





const app=new express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const uploadroutes = require('./routes/uploadroutes');
const userRoutes= require('./routes/userRoutes')
const routesUser = require('./routes/routesUser');

app.use('/upload', uploadroutes);
app.use('/change', userRoutes);
app.use('/editprofile', routesUser);

const authRoutes = require('./routes/auth');
app.use('/user', authRoutes);
app.listen(3000,() => {
    console.log(`Server running on port 3000`);
});