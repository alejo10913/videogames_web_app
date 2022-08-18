import axios from "axios";


//------------------------get videogames---------------------------------
export function getVideoGames() {
  return async function (dispatch) {
    var games = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: games.data,
    });
  }
}

//-----------------------get videogames detail ----------------------------
export function videogameDetail(id) {
  return async function (dispatch) {
    try {
      let detail = await axios.get("http://localhost:3001/videogames/" + id);
      return dispatch({
        type: "GAME_DETAIL",
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//---------------------añadir a favoritos----------------------------------
export function addFavorites(payload){
  return {
    type: "ADD_FAVORITES",
    payload
    
  }
}

//----------------------remover favoritos----------------------------------------
export function removeFavorites(id){
  return{
    type: "REMOVE_FAVORITES",
    payload: id
  }
}

//----------------------limpiar el detalle------------------------------------
export function cleanDetail(payload) {
  return {
    type: "CLEAN_DETAIL",
    payload,
  };
}

//----------------------limpiar resultados-----------------------------------
export function cleanresults(payload) {
  return {
    type: "CLEAN_RESULT",
    payload,
  };
}


//-----------------------obtener juego por nombre-----------------------------
export function getNameGame(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogames/name?name=" + name
      );
      return dispatch({
        type: "GET_NAME_GAME",
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERRORS",
        payload: error.response.data,
      });
    }
  };
}

//---------------------------obtener generos--------------------------------
export function getGenres() {
  return async function (dispatch) {
      let genres = await axios.get("http://localhost:3001/genres",)
   
      return dispatch({
        type: "GET_GENRES",
        payload: genres.data,
      });
    
  };
}

//----------------------------obtener plataformas----------------------------
export function getPlatforms() {
  return async function (dispatch) {
    try {
      let plataformas = await axios.get(
        "http://localhost:3001/videogames/plataformas"
      );
      return dispatch({
        type: "GET_PLATFORMS",
        payload: plataformas.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//------------------------------crear videojuego-------------------------------
export function creategame(data) {
  return async function () {
    const creategame = await axios.post(
      "http://localhost:3001/videogames",
      data
    );
  };
}

//-----------------------------filtro base datos o API----------------------
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

//----------------------------filtro por genero---------------------------
export function orderbygenre(payload) {
  return {
    type: "ORDER_BY_GENRE",
    payload,
  };
}
//-----------------------------orden alfabetico---------------------------
export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

//------------------------------orden por rating---------------------------
export function orderByRating(payload){
    return{
        type: "ORDER_BY_RATING",
        payload
    }
}

//------------------------------borrar juego base de datos------------------
export function  DeleteGame(id){
  return async function (dispatch){
      const res = axios.delete(`http://localhost:3001/videogames/${id}`)
      return dispatch ({
          type:"DELETE_GAME",
          payload:res.data

})
}}