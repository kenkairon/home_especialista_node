const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//Servidor
app.set('port',3000);
app.set('views',path.join(__dirname,'views'));
app.set('views engine','ejs');


//Middlewars
app.use(morgan('dev'));
app.use(morgan('combined'));
app.use(express.urlencoded({extended:false}));



//invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env',encoding: 'latin1'});


//rutas
app.use(require('./routes/index'));

//static
app.use(express.static(path.join(__dirname,'public')));

//404 handler
app.use((req,res,next)=>{
    res.status(404).send('404 Not found');
})

module.exports = app;