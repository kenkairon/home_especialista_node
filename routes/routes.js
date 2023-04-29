//configuracion de rutas
const {Router} = require('express');
const router = Router();

//configuracion de file
const fs = require('fs');
// Se Parcea el json detalle.json
const detalles= JSON.parse(fs.readFileSync('detalles.json', 'utf8'));

// invocamos al módulo de la conexión es ;
const conexion = require('../database/db');

// Se le indica la ruta index.ejs rut con card y json
router.get('/',(req,res) => {
  res.render('index.ejs',{detalles})
});

// requerimos controlador del login
const authController =require('../controllers/authController');
//crud de mantenedor
const crud = require('../controllers/crud');
//lamammos los controladors del crud2.ejs
const crud2 = require('../controllers/crud2');
//lamamos el crud de la region
const  crudregion = require('../controllers/crudregion');
//llamamos los controladores del crud.js
const crudcomuna = require('../controllers/crudcomuna');
const crudpersona = require('../controllers/crudPersona');
router.get('/dashboard',authController.isAuthenticated, (req, res)=>{

    res.render('dashboard.ejs', {user: req.username});

})
//FROND
// Creamos la ruta de agregar datos adicionales----------------------------------------
router.get('/create', async (req, res) => {
      // const results = await conexion.query('SELECT * FROM profesiones ORDER BY id ASC'); si voy a mandar u bacti id
    try{
      const resultado = await fetch(`http://localhost:5007/api/v1/profe`);
      const data = await resultado.json();
        res.render('create.ejs', { resultado:data });
    }catch(error){
      throw error
    }
});
//---------------------------------------------------------------------------------------

// FROND RENDERIZA A FORMULARIO CON DATOS CARGADOS PARA EDITAR 
router.get('/edit/:id', async(req,res)=>{
  const {id} =  req.params;
  
  try {
    const results = await fetch(`http://localhost:5007/api/v1/profe/${id}`, {
      headers: { "Content-Type": "application/json" }
    });
    const data = await results.json();
    if (!data) {
      res.status(404).send('Not found');
      return;
    }
    res.render("edit.ejs", { results: data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// profesiones del crud de profesional ingreso
router.post('/create',crud.save, (req, res)=> {
});

//crud para actualizar
router.post('/update', crud.update);
//ruta de Eliminación tipo FROND 
router.delete('/delete/:id', async(req,res)=>{
    const {id} =  req.params;
    await fetch(`http://localhost:5007/api/v1/profe/${id}`,
    {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    });
  })
//-------------------------------------------------
//crear ingreso de region
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
//Actualizamos el crud
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
//--------------------------------------------------------------------------------------
// ingreso de comuna
router.get('/createingresocomuna', async (req, res) => {
  try {
    const results = await conexion.query('SELECT * FROM region');
    console.log(results)
    res.render('createComuna.ejs', {regiones: results.rows});
  } catch (error) {
      throw error;
  }
});
//------------------------------------------------------------
//ingreso comuna de la tabla
router.post('/createcomuna',crudcomuna.save, (req, res)=> {
});
//Update comuna
router.post('/updatecomuna',crudcomuna.update, (req, res)=> {
});
// Creamos el ingreso de mantenedor de regiones--------Selección de la tabla -------enviando la results a la vista region.ejs
router.get('/createcomuna', async (req, res) => {
  try {
      const results = await conexion.query('SELECT * FROM comuna  ORDER BY id ASC');
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
      const results = await conexion.query('SELECT * FROM comuna WHERE id=$1', [idComuna]);
      res.render('editcomuna.ejs', { comuna: results.rows });
  } catch (error) {
      throw error;
  }
});
//---ingreso de personas
router.get('/createpersona', async (req, res) => {
  try {
    const resul = await conexion.query('SELECT * from comuna');
    const result = await conexion.query('SELECT * from region');
    console.log(result);
    res.render('createpersona.ejs', { comuna: resul.rows, region: result.rows });
  } catch (error) {
    throw error;
  }
});
// crearla rut get de persona
router.get('/persona', async (req, res) => {
  //
  try {
      const results = await conexion.query('SELECT persona.id, persona.rut, persona.nombre, persona.apellido, persona.fechanacimiento,persona.correo, persona.direccion, comuna.nombre as nombre_comuna, region.nombre as nombre_region FROM persona JOIN comuna ON persona.comuna_id = comuna.id JOIN region ON persona.region_id = region.id ORDER BY persona.id ASC');
      res.render('personas.ejs', { personas: results.rows});
  } catch (error) {
      throw error;
  }
});
// profesiones del crud de profesional ingreso
router.post('/createpersona',crudpersona.save, (req, res)=> {
});
// profesiones del crud de perfil ingreso
router.post('/updatepersona',crudpersona.update, (req, res)=> {
});
// personas actualizar
router.get('/updatepersona/:id', async (req, res) => {
  const idPersona = req.params.id;
  try {
      const resultados = await conexion.query('SELECT * from comuna');
      const resulta = await conexion.query('SELECT * from region');
      const resul = await conexion.query('SELECT persona.id, persona.rut, persona.nombre, persona.apellido, persona.fechanacimiento,persona.correo, persona.direccion, comuna.nombre as nombre_comuna, region.nombre as nombre_region FROM persona JOIN comuna ON persona.comuna_id = comuna.id JOIN region ON persona.region_id = region.id WHERE persona.id =$1', [idPersona]);

      res.render('editpersona.ejs', { personas: resul.rows, comuna:resultados.rows, region:resulta.rows});
  } catch (error) {
      throw error;
  }
});
// Eliminar persona
router.get('/delete/:id',async (req, res) => {
  const id = req.params.id;
  try {
      resultado = await conexion.query('DELETE FROM persona WHERE id = $1',[id]);
      if(resultado = true){
          req.flash('success', 'Eliminado Correctamente')
          res.redirect('/persona');
      }
  }catch(error){
      throw error;
  }
});
// ruta login
router.get('/login', (req, res)=>{
  res.render('login.ejs', {alert:false})
})
//ruta de registro
router.get('/register', (req, res)=>{
  res.render('register.ejs')
})
//router para los métodos del controller
router.post('/register', authController.register)
//rota para login llamando controlador
router.post('/login', authController.login)
//rut de login llamado de cerrar sesión
router.get('/logout', authController.logout)

module.exports = router;

