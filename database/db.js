const { Pool } = require('pg');

// Crear la instancia del Pool de conexiones
const conexion = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PUERTO
});

// Realizar una consulta a la base de datos para verificar la conexión
conexion.query('SELECT NOW()', (error, resultado) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('¡Conexión exitosa a la base de datos con Amazon Web Service!');
});

// Exportar la instancia del Pool de conexiones
module.exports = conexion;
