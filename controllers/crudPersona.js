const conexion= require('../database/db');

exports.save = (req,res)=>{
    const rut= req.body.txtRut;
    const nombre = req.body.txtNombre;
    const apellido =req.body.txtApellido;
    const fecha = req.body.txtFechanacimiento;
    const correo=req.body.txtCorreo;
    const direccion=req.body.txtApellido;
    const comuna= req.body.txtComuna;
    const region=req.body.txtRegion
    conexion.query('INSERT INTO persona (rut, nombre, apellido, fechanacimiento,correo,direccion,comuna_id,region_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [rut,nombre,apellido,fecha,correo,direccion,comuna,region], (error, results) => {
        if (error) {
          console.log(error);
        } else {
            req.flash('success', ' Agregado Correctamente')
            res.redirect('/persona');
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
