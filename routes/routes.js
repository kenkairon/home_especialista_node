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

const authController =require('../controllers/authController');
const crud = require('../controllers/crud');
//lamammos los controladors del crud2.ejs
const crud2 = require('../controllers/crud2');
//lamamos el crud de la region
const  crudregion = require('../controllers/crudregion');
//llamamos los controladores del crud.js
const crudcomuna = require('../controllers/crudcomuna');
router.get('/dashboard',authController.isAuthenticated, (req, res)=>{

    res.render('dashboard.ejs', {user: req.username});

})
// Creamos la ruta de agregar datos adicionales----------------------------------------
router.get('/create', async (req, res) => {
  try {
      const results = await conexion.query('SELECT * FROM profesiones ORDER BY id ASC');
      res.render('create.ejs', { results: results.rows});
  } catch (error) {
      throw error;
  }
});
//---------------------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------------
//crud para actualizar
router.post('/update', crud.update);
//ruta de Eliminación
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
// profesiones del crud de profesional ingreso
router.post('/create',crud.save, (req, res)=> {

});
// profesiones del crud de perfil ingreso
router.post('/perfil',crud2.save, (req, res)=> {
});
// Creamos la ruta de agregar datos de perfil
router.get('/perfil', async (req, res) => {
  //
  try {
      const results = await conexion.query('SELECT * FROM  perfil ORDER BY id ASC');
      res.render('create2.ejs', { results: results.rows});
  } catch (error) {
      throw error;
  }
});
//------------------crud para actualizar perfil-----------
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
//-----------------------------------------------------------
//ruta para eliminar perfil
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
//-------------------------------------------------
router.get('/createingresoregion', async (req, res) => {
  try {   
    res.render('createregiones.ejs');
  } catch (error) {
      throw error;
  }
})
// Creamos el ingreso de mantenedor de regiones--------Selección de la tabla -------enviando la results a la vista region.ejs
router.get('/createregion', async (req, res) => { 
  try {
      const results = await conexion.query('SELECT * FROM region ORDER BY id ASC');
      console.log(results)
      res.render('region.ejs', { region: results.rows});
  } catch (error) {
      throw error;
  }
});
//---------------------------------------------------------------------------------------------------
// creamos la ruta /create de la tabla profesiones del crud de profesional sirve para ingresar de a acuerdo .save que viene el controlador crud
router.post('/createregion',crudregion.save, (req, res)=> {
});
router.post('/updateregion', crudregion.update);
//Seleccionar id
router.get('/updateregion/:id', async (req, res) => {
  const idregion = req.params.id;
  try {
      const resul= await conexion.query('SELECT * FROM region WHERE id=$1', [idregion]);
      console.log(resul)
      res.render('editregion.ejs',{regio:resul.rows});
  } catch (error) {
      throw error;
  }
});

router.get('/delete3/:id',async (req, res) => {
  const id = req.params.id;
  try {
      resultado = await conexion.query('DELETE FROM region WHERE id = $1',[id]);
      if(resultado = true){
          req.flash('success', 'Eliminado Correctamente')
          res.redirect('/createregion');
      }
  }catch(error){
      throw error;
  }
});
//--------------------------------------------------------------------------------------

router.get('/createingresocomuna', async (req, res) => {
  try {
    const results = await conexion.query('SELECT * FROM region');
    console.log(results)
    res.render('createComuna.ejs', {regiones: results.rows});
  } catch (error) {
      throw error;
  }
})

//------------------------------------------------------------
//ingreso comuna
router.post('/createcomuna',crudcomuna.save, (req, res)=> {
});
// Creamos el ingreso de mantenedor de regiones--------Selección de la tabla -------enviando la results a la vista region.ejs
router.get('/createcomuna', async (req, res) => {
  try {
      const results = await conexion.query('SELECT c.id, c.nombre AS comuna, r.nombre AS region FROM comuna c JOIN region r ON c.region_id = r.id  ORDER BY id ASC;');
      console.log(results)
      res.render('comuna.ejs',{comuna:results.rows});
  } catch (error) {
      throw error;
  }
});
//Seleccionar id
router.get('/updatecomuna/:id', async (req, res) => {
  const idComuna = req.params.id;
  try {
      const resul = await conexion.query('SELECT * FROM comuna WHERE id=$1', [idComuna]);
      const results = await conexion.query('SELECT c.id, c.nombre AS comuna, r.id AS region_id, r.nombre AS region FROM comuna c JOIN region r ON c.region_id = r.id WHERE c.id=$1 ORDER BY c.id ASC', [idComuna]);
      console.log(resul)
      res.render('editcomuna.ejs', { comuna: resul.rows, regiones: results.rows });
  } catch (error) {
      throw error;
  }
});
//--------------------------------------------------
router.get('/createpersona', async (req, res) => {
  try {   
    res.render('createpersona.ejs');
  } catch (error) {
      throw error;
  }
})
// crearla rut get de persona
router.get('/persona', async (req, res) => {
  //
  try {
      const results = await conexion.query('SELECT * FROM  persona ORDER BY id ASC');
      res.render('personas.ejs', { personas: results.rows});
  } catch (error) {
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

