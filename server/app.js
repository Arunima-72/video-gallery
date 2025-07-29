const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./db/connection');

const path = require('path');




const app=new express();
app.use(morgan('dev'));
app.use(cors());
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
app.use(express.json({ limit: '10gb' }));
app.use(express.urlencoded({ extended: true, limit: '10gb' }));
const adminroutes = require('./routes/adminRoutes');
const uploadroutes = require('./routes/uploadroutes');
const userRoutes= require('./routes/userRoutes')
const routesUser = require('./routes/routesUser');
const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/userActivity');

app.use('/upload', uploadroutes);
app.use('/change', userRoutes);

app.use('/editprofile', routesUser);

app.use('/admin', adminroutes);
app.use('/activity', activityRoutes);


app.use('/user', authRoutes);
app.listen(3000,() => {
    console.log(`Server running on port 3000`);
});