const {Router} = require('express');
const router = Router()
const {getGenres} = require('../controller/genres.controller')


router.get('/', async (req, res, next)=>{
    try {
        const genres = await getGenres()
        genres?
        res.status(200).json(genres):
        res.status(404).send('no hay generos')
    } catch (error) {
        next(error)
    }
})

module.exports = router;