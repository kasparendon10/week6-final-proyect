const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorMiddleware'); // Importar el middleware de manejo de errores

const app = express();

// Middleware para parsear JSON en las peticiones
app.use(bodyParser.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
    return res.send("Welcome to express!");
});

// Rutas principales bajo el prefijo /api/v1
app.use('/api/v1', routes);

// Middleware de manejo de errores global
app.use(errorHandler);

module.exports = app; // Asegúrate de exportar la aplicación




