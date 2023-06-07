const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'likeme',
    password: 'technomax0374',
    port: 5432,
});

// Conexión a la base de datos
const connect = async () => {
    try {
        await pool.connect();
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

module.exports = {
    connect,
    pool,
};
