const {Router} = require('express');
const router = Router();

const fs = require('fs');
// Se Parcea el json detalle.json
const detalles= JSON.parse(fs.readFileSync('detalles.json', 'utf8'));

//8 invocamos al módulo de la conexión es ;
const conexion = require('../database/db');

// Se le indica la ruta index.ejs
router.get('/',(req,res) => {
  res.render('index.ejs',{detalles})
});

module.exports = router;

