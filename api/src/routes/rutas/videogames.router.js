const {Router} = require('express')
const {getAllInfo, getGameByID, byName, getAllPlatforms} = require('../controller/videogames.controller')
const {Genres, Videogame} = require('../../db')
const axios = require ('axios')


const router = Router()




router.get('/', async(req, res, next)=>{
    
    try {
        
        let allVideogames = await getAllInfo();
        
        allVideogames?
        res.status(200).send(allVideogames):
        res.status(404).send("no hay videojuegos para mostrar")
        
    } catch (error) {
        next(error)
    }
})

router.get('/plataformas', async(req, res, next)=>{
    
    try {
        
        let plataformas = await getAllPlatforms();
        
        plataformas?
        res.status(200).send(plataformas):
        res.status(404).send("no hay plataformas para mostrar")
        
    } catch (error) {
        next(error)
    }
})

router.get('/name', async(req, res, next) => {
    const {name} = req.query
    try {
        let gameByName = await byName(name)
        gameByName.length?
         res.status(200).send(gameByName):
         res.status(404).send("no hay juegos con ese nombre")
         
         
        } catch (error) {
            next (error)
        }
    })
    
router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            await Videogame.destroy({
                where: {id: id}
            })
            res.send("Juego borrado")
        } catch (error) {
            res.send("error")
        }
    })
    
    
    
    router.get('/:id', async(req, res, next) =>{
        const {id} = req.params
    try {
        const gameID = await getGameByID(id)
        
            gameID?
            res.status(200).json(gameID):
            res.status(404).send('no hay juegos con ese id')

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


        const genresDb = await Genres.findAll({
            where: {name : genres}
        })
        newGame.addGenres(genresDb)
        res.status(200).send('juego creado correctamente')
        
    } catch (error) {
        next(error)
    }
})

// exports.deleteForId = async(req,res,next)=>{
//     try {
//         const {id} =req.params
//         await Videogame.destroy({
//             where:{
//                 id,
//             }

//         })
//         res.send({info:"Game deleted!!"})
//     } catch (error) {
//         next({ error:"Can`t delete game"})
//     }
// }

module.exports = router
