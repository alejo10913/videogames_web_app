const {Genres} =require('../db');
const axios = require('axios');
require('dotenv').config()
const YOUR_API_KEY = process.env


const getallGenres = async() =>{


 try {
    const allGenre = []
                let infoApi = await axios(`https://api.rawg.io/api/genres?key=751305d507034a729a0f5ece9c3c8c6f`)
             
                infoApi.data.results?.map((genre) =>{
                    return allGenre.push({
                        name: genre.name,
                        id: genre.id
                    });
                });
                await Genres.bulkCreate(allGenre)
            
        
 } catch (error) {
    console.log(error)
 }
}


module.exports = {getallGenres}
