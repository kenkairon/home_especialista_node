const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// sirven para los mensajes
const flash = require('connect-flash');
const session = require('express-session');



//empezar un sesion
app.use(session({
	secret:'12348',
	resave:false,
	saveUninitialized:false
}));

// Configuración de express-flash y session sirven para la configuracion de mensajes
app.use(flash());

app.use((req, res, next) => {
    app.locals.messages = req.flash('success');
next();
});
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