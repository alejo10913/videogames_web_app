const {Genres, Videogame } = require('../../db');
const axios = require('axios');
require ('dotenv').config()
const YOUR_API_KEY = process.env 


const getApiVideogames = async() => {
    try {
        const allVideogames = []
        //let apiUrl = ("https://api.rawg.io/api/games?key=751305d507034a729a0f5ece9c3c8c6f")
        let apiUrl = (`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
                for(let i = 0; i <= 4; i++){
                    let apidata = await axios.get(apiUrl)

                apidata.data.results?.map((game) => {
                    return allVideogames.push({
                        id: game.id,
                        name: game.name,
                        released: game.released,
                        rating: game.rating,
                        Image: game.background_image,
                        platforms: game.platforms.map(plat => plat.platform.name),
                        genres: game.genres.map(gen => gen.name),

                    })
                })
                apiUrl= apidata.data.next
                }
                console.log(allVideogames.length)
                return allVideogames
    } catch (error) {
        console.log(error)
    }
}


const getVideogamesDb = async() => {

    try {
        const dbGames = await Videogame.findAll({
            include:[
                {
                model: Genres,
                through: {  attributes:[]},     
                }
            ]
        })
        console.log(dbGames)
        const games = dbGames.map(game => {
            return{
                id: game.id,
                name: game.name,
                released: game.released,
                description: game.description,
                image: game.image,
                genres: game.genres.map(gen => gen.name),
                platforms: game.platforms
            }
        })
        return games

    } catch (error) {
        return error
    }

}



const getAllInfo = async() => {
    try {
        let infoApi = await getApiVideogames()
        let infoDB = await getVideogamesDb()
        let infoTotal = infoDB.concat(infoApi)

        return infoTotal

    } catch (error) {
        
    }
}



module.exports = {getAllInfo}