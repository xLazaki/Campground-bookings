const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss= require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose')
//load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();
//Route files
const app=express();
const camps = require ('./routes/camps');
const reservations = require('./routes/reservations');
const auth= require ('./routes/auth');

app.use(express.json());
//Cookie parser
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//Helmet
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
    windowsMs:10*60*100, // 10min
    max: 1000
})
app.use(limiter);

//Prevent htpp param pollutions
app.use(hpp());
//Body parser
app.use('/api/v1/camps',camps);
app.use('/api/v1/auth',auth);
app.use('/api/v1/reservations', reservations);

const PORT=process.env.PORT || 3000;

const server = app.listen(PORT,console.log('Server running in ', process.env.NODE_ENV,' mode on port ', PORT));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //close server & exit process
    server.close(()=>process.exit(1));
});
