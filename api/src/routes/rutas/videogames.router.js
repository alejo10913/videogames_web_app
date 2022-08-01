const {Router} = require('express')
const {getAllInfo} = require('../controller/videogames.controller')
const {Genres, Videogame} = require('../../db')


const router = Router()


router.get('/', async(req, res, next)=>{

    try {
        const {name} = req.query
        let allVideogames = await getAllInfo();
        let games =[]

        if(name){
            let gameName =  allVideogames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
            console.log(gameName)

            gameName.length?
            res.status(200).send(gameName):
            res.status(404).send('no se encontraron videojuegos con ese nombre')

        } else{
            res.status(200).send(allVideogames)
        }
        
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req, res, next) =>{
    try {
        const {id} = req.params
        const totalGames = await getAllInfo()
        if(id){
            let gameID = await totalGames.filter(game => game.id ==id)
            gameID.length?
            res.status(200).json(gameID):
            res.status(404).send('no hay juegos con ese id')
        }

    } catch (error) {
        next(error)
    }
})

router.post('/', async(req, res, next) =>{
    const {name, description, released, rating, genres, platforms, image} = req.body

    try {
        const newGame = await Videogame.create({
            name,
            description,
            released,
            rating, 
            genres, 
            platforms,
            image
        })
        newGame.addGenres(genres)
        res.status(200).send('juego creado correctamente')
        
    } catch (error) {
        next(error)
    }
})



module.exports = router

