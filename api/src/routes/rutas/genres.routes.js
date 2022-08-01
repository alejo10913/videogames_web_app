const {Router} = require('express');
const router = Router()
const {getGenres} = require('../controller/genres.controller')


router.get('/', async (req, res, next)=>{
    try {
        const genres = await getGenres()
        res.status(200).json(genres)
    } catch (error) {
        next(error)
    }
})

module.exports = router;