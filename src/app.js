const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes'); // Ruta para tus rutas
const errorHandler = require('./utils/errorHandler'); // Manejador de errores
require('dotenv').config();

// Esta es nuestra aplicación
const app = express();

// Middlewares
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());

// Ruta base para tus endpoints de la API
app.use('/api/v1', router);

// Ruta de prueba para verificar que el servidor esté funcionando
app.get('/', (req, res) => {
    return res.send("Welcome to express!");
});

// Middlewares después de las rutas (por ejemplo, manejo de errores)
app.use(errorHandler);

module.exports = app;



