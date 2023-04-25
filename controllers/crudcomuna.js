const conexion= require('../database/db');

exports.save = (req,res)=>{
    const nombre= req.body.txtNombre;
    const region= req.body.txtRegion;
    console.log(nombre);
    console.log(region);
    conexion.query('INSERT INTO comuna (nombre,region_id) VALUES ($1,$2) RETURNING *', [nombre,region], (error, results) => {
    
      if (error) {
          console.log(error);
        } else {
          req.flash('success', 'Dato Comunas Agregado Correctamente')
          res.redirect('/createcomuna');
        }
      })
}
exports.update = (req, res) => {
    const id = req.body.txtId;
    const nombre= req.body.txtNombre;
    conexion.query('UPDATE profesiones SET nombre=$1 WHERE id=$2',[nombre,id], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        req.flash('success', 'Dato Editado Correctamente')
        res.redirect('/create');
      }
    })
}
