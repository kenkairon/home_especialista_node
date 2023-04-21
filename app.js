const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

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

//para trabajar con las cokies
app.use(cookieParser());


//rutas
app.use(require('./routes/routes'))

//static
app.use(express.static(path.join(__dirname,'public')));

//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//404 handler
app.use((req,res,next)=>{
    res.status(404).render('404.ejs');
})

module.exports = app;