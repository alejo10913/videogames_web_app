const {Genres, Videogame } = require('../../db');
const axios = require('axios');
require ('dotenv').config()
const {YOUR_API_KEY} = process.env 
const {Op} = require('sequelize')


const getApiVideogames = async() => {
    try {
        const allVideogames = []
       let apiUrl = (`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
                for(let i = 0; i <= 4; i++){
                    let apidata = await axios.get(apiUrl)

                apidata.data.results?.map((game) => {
                    return allVideogames.push({
                        id: game.id,
                        name: game.name,
                        released: game.released,
                        rating: game.rating,
                        image: game.background_image,
                        platforms: game.platforms.map(plat => plat.platform.name),
                        genres: game.genres.map(gen => gen.name),
                        createdInDb: false

                    })
                })
                apiUrl= apidata.data.next
                }
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
    
        const games = dbGames.map(game => {
            return{
                id: game.id,
                name: game.name,
                released: game.released,
                description: game.description,
                image: game.image,
                genres: game.genres.map(gen => gen.name),
                platforms: game.platforms,
                createdInDb: game.createdInDb,
                rating: game.rating
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
        return error
    }
}


const byName =  async(name) => {
 
    try {
        let gameNameDb =[]
        const Db = await Videogame.findAll({
            where:{
                 name:{
                    [Op.iLike]:`%${name}%`
                 }
                },
                include: Genres
            }) 
        if(Db){
                Db.map((v) => {
                    gameNameDb.push({ 

                        id: v.id,
                        name: v.name,
                        released:v.released,
                        rating: v.rating,
                        platforms: v.platforms,
                        image: v.image,
                        genres: v.genres.map(el => el.name),
                    }) 

                })
        }

       let gameNameApi =[]

        const api = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`);
        api.data.results.map((v) => { 
            gameNameApi.push({ 
                id: v.id,
                name: v.name,
                released:v.released,
                rating: v.rating,
                platforms: v.platforms.map(el => el.platform.name),
                image: v.background_image,
                genres: v.genres.map(el => el.name),
            }) 

        })
        let allGameForName =[...gameNameDb,...gameNameApi]
   
        return allGameForName.slice(0,15);
      
        
    }catch (error) {
        return ({error:"no hay juego con ese nombre"})
    }

}


const getGameByID = async(id) => {
    try {
        if(id.length > 10){
            let videoGameDb = await Videogame.findAll({
                include: {
                    model: Genres
                },
                where: {id: id}
            })
            let game = videoGameDb.map(game => {
                return{
                    name: game.name,
                    image: game.image,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms,
                    genres: game.genres.map(gen => gen.name),
                    description: game.description
                }
            })
            return game;
        } else{
            let  gameapi= [] 
            let apiDataId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
          
            const gameId =({
                name:apiDataId.data.name,
                image: apiDataId.data.background_image,
                description: apiDataId.data.description_raw,
                platforms: apiDataId.data.parent_platforms.map(plat => plat.platform.name),
                genres: apiDataId.data.genres.map(gen => gen.name),
                released: apiDataId.data.released,
                rating: apiDataId.data.rating
            });
            gameapi.push(gameId)
            return gameapi
        }
    } catch (error) {
        return ("no hay videojuegos con ese ID")
    }
}


const getAllPlatforms = async () => {
 try {
    let platforms= await  getApiVideogames()
    platforms = platforms.map(el => el.platforms).flat()
    platforms = [...new Set(platforms.sort())]
    platforms = platforms.map((el, i) => {
        return{
            id: i + 1,
            name: el
        }
    })
    return platforms
    
 } catch (error) {
    console.log(error)
 }

}


module.exports = {getAllInfo, getGameByID, byName, getAllPlatforms}