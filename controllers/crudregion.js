//exportación de database
const conexion= require('../database/db');
// exportamos region
exports.save = (req,res)=>{
    const nombre= req.body.txtNombre;
    conexion.query('INSERT INTO region (nombre) VALUES ($1) RETURNING *', [nombre], (error, results) => {

    if (error) {
            console.log(error);
        } else {
            req.flash('success', 'Dato región Agregado Correctamente')
            res.redirect('/createregion');
        }
    })
}
//exportamos la actualización
exports.update = (req, res) => {
    const id = req.body.txtidRegion;
    const nombre= req.body.txtNombre;
    conexion.query('UPDATE region SET nombre=$1 WHERE id=$2',[nombre,id], (error,result) => {
        console.log(result)
    if (error) {
        console.log(error);
    } else {
        req.flash('success', 'Dato Editado Correctamente')
        res.redirect('/createregion');
        }
    })
}
