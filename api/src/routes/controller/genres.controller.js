const {Genres} = require ('../../db')

const getGenres = async () => {
    const allGenres = await Genres.findAll();
    const Genre = allGenres.map((genre) => {
        return {
            id: genre.id,
            name: genre.name,
        };
    });
    return Genre;
}

module.exports = {getGenres}