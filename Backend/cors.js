const cors = require('cors');

// Configuración de los orígenes permitidos
const allowedOrigins = ['http://localhost:3000']; // Reemplaza con los orígenes permitidos de tu aplicación

// Configuración del middleware CORS
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Acceso no permitido por CORS'));
        }
    },
};

// Middleware CORS
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
