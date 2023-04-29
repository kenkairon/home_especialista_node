const conexion= require('../database/db');

exports.save = (req,res)=>{
    const nombre= req.body.txtNombre;
    conexion.query('INSERT INTO profesiones (nombre) VALUES ($1) RETURNING *', [nombre], (error, results) => {
      if (error) {
          console.log(error);
        } else {
          req.flash('success', 'Dato profesion Agregado Correctamente')
          res.redirect('/create');
        }
      })
}
exports.update = (req, res) => {
    const id = req.body.txtId;
    const nombre= req.body.txtNombre;
    conexion.query('UPDATE profesiones SET nombre=$1  WHERE id=$2',[nombre,id], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        req.flash('success', 'Dato Editado Correctamente')
        res.redirect('/create');
      }
    })
}
