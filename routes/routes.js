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

//lamar al controlador de Login y autentificación
const authController = require('../controllers/authController');
//llama al controlador de crud de profesiones
const crud = require('../controllers/crud');
//lama al controlador de crud de perfil
const crud2 = require('../controllers/crud2');
router.get('/dashboard',authController.isAuthenticated, (req, res)=>{

    res.render('dashboard.ejs', {user: req.username});

})
// Creamos la ruta de agregar datos adicionales
router.get('/create', async (req, res) => {
  try {     
      const results = await conexion.query('SELECT * FROM profesiones ORDER BY id ASC');
      res.render('create.ejs', { results: results.rows});
  } catch (error) {
      throw error;
  }
});

//ruta para editar los registros

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const results = await conexion.query('SELECT * FROM profesiones WHERE id=$1', [id]);
        res.render('edit.ejs', { results: results.rows });
    } catch (error) {
        throw error;
    }
});
router.post('/update', crud.update);

router.get('/delete/:id',async (req, res) => {
    const id = req.params.id;    
    try {
        resultado = await conexion.query('DELETE FROM profesiones WHERE id = $1',[id]);
        if(resultado = true){
            req.flash('success', 'Eliminado Correctamente')
            res.redirect('/create');
        }
    }catch(error){
        throw error;
    }

});
// profesiones del crud de profesional
router.post('/create',crud.save, (req, res)=> {

});
// profesiones del crud de perfil
router.post('/perfil',crud2.save, (req, res)=> {
});

// Creamos la ruta de agregar datos adicionales
router.get('/perfil', async (req, res) => {
  //
  try {
      const results = await conexion.query('SELECT * FROM  perfil ORDER BY id ASC');
      res.render('create2.ejs', { results: results.rows});
  } catch (error) {
      throw error;
  }
});
router.post('/update2', crud2.update);
//Seleccionar id
router.get('/edit2/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const results = await conexion.query('SELECT * FROM perfil WHERE id=$1', [id]);
      res.render('edit2.ejs', { resu: results.rows });
  } catch (error) {
      throw error;
  }
});


router.get('/delete2/:id',async (req, res) => {
  const id = req.params.id;    
  try {
      resultado = await conexion.query('DELETE FROM perfil WHERE id = $1',[id]);
      if(resultado = true){
          req.flash('success', 'Eliminado Correctamente')
          res.redirect('/perfil');
      }
  }catch(error){
      throw error;
  }

});
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

