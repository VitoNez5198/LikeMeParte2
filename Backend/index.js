const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const database = require('./database');

const app = express();
const port = 3000;

// Habilitar los cors
app.use(cors());

// Conectar a la base de datos
database.connect();

// Parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Rutas para los posts
app.use('/posts', postsRouter);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
