const {Router} = require('express');
const router = Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Se Parcea el json detalle.json
const detalles= JSON.parse(fs.readFileSync('src/detalles.json', 'utf8'));
// Se le indica la ruta index.ejs
router.get('/',(req,res) => {
  res.render('index.ejs',{detalles})
});
module.exports = router;

