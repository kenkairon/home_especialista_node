const { Pool } = require('pg');
const conexion = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PUERTO
});
conexion.connect((error) => {
    if (error) {
        console.error('El error de conexión es: ' + error);
    return;
    }
    console.log('¡Conectado a la Base de Datos con Amazon Web Service!');
});
//Exportar la base de datos
module.exports = conexion;