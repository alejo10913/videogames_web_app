const { Router } = require('express');
const videoGamesRoutes = require('../routes/rutas/videogames.router')
const genresRoutes = require('../routes/rutas/genres.routes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videoGamesRoutes)
router.use('/genres', genresRoutes)

module.exports = router;
