const conexion= require('../database/db');

exports.save = (req,res)=>{
    const nombre= req.body.txtNombre;
    const apellido = req.body.txtApellido;
    const telefono =req.body.txtTelefono;
    const correo = req.body.txtCorreo;
    const direccion=req.body.txtDireccion;
    const ciudad= req.body.txtCiudad;
    conexion.query('INSERT INTO perfil (nombre, apellido, telefono, correo_electronico,direccion,ciudad) VALUES ($1, $2, $3, $4, $5, $6)', [nombre,apellido,telefono,correo,direccion,ciudad], (error, results) => {
        if (error) {
          console.log(error);
        } else {
            req.flash('success', ' Agregado Correctamente')
            res.redirect('/perfil');
        }
      })
}
exports.update = (req, res) => {
    const id = req.body.txtId;
    const nombre= req.body.txtNombre;
    const apellido = req.body.txtApellido;
    const telefono =req.body.txtTelefono;
    const correo = req.body.txtCorreo;
    const direccion=req.body.txtDireccion;
    const ciudad= req.body.txtCiudad;
    conexion.query('UPDATE perfil SET nombre=$1, apellido=$2, telefono=$3, correo_electronico=$4,direccion=$5,ciudad=$6 WHERE id=$7',[nombre,apellido, telefono, correo, direccion,ciudad,id], (error, result) => {

      if (error) {
        console.log(error);
      } else {
        req.flash('success', 'Editado Correctamente')
        res.redirect('/perfil');
      }
    })
}