const {Router} = require('express');
const router = Router();

const fs = require('fs');
// Se Parcea el json detalle.json
const detalles= JSON.parse(fs.readFileSync('detalles.json', 'utf8'));

// invocamos al módulo de la conexión es ;
const conexion = require('../database/db');

// Se le indica la ruta index.ejs rut con card y json
router.get('/',(req,res) => {
  res.render('index.ejs',{detalles})
});

//lamar al controlador
const authController =require('../controllers/authController');
router.get('/dashboard',authController.isAuthenticated, (req, res)=>{
 
  res.render('dashboard.ejs', {user: req.username});
})

router.get('/login', (req, res)=>{
  res.render('login.ejs', {alert:false})
})
router.get('/register', (req, res)=>{
  res.render('register.ejs')
})


//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


module.exports = router;

