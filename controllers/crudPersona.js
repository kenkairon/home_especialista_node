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
    const rut= req.body.txtRut;
    const nombre = req.body.txtNombre;
    const apellido =req.body.txtApellido;
    const fecha = req.body.txtFechanacimiento;
    const correo=req.body.txtCorreo;
    const direccion=req.body.txtApellido;
    const comuna= req.body.txtComuna;
    const region=req.body.txtRegion
    conexion.query('UPDATE persona SET rut=$1, nombre=$2, apellido=$3, fechanacimiento=$4,correo=$5,direccion=$6,comuna_id=$7, region_id=$8 WHERE id=$9',[rut,nombre, apellido, fecha, correo,direccion,comuna,region,id], (error, result) => {

      if (error) {
        console.log(error);
      } else {
        req.flash('success', 'Editado Correctamente')
        res.redirect('/persona');
      }
    })
}
