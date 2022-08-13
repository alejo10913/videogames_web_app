import axios from "axios";

export function getVideoGames() {
  return async function (dispatch) {
    var games = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: games.data,
    });
  };
}

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

export function addFavorites(payload){
  return {
    type: "ADD_FAVORITES",
    payload
    
  }
}

export function removeFavorites(id){
  return{
    type: "REMOVE_FAVORITES",
    payload: id
  }
}

export function cleanDetail(payload) {
  return {
    type: "CLEAN_DETAIL",
    payload,
  };
}

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

export function getGenres() {
  return async function (dispatch) {
      let genres = await axios.get("http://localhost:3001/genres",)
   
      return dispatch({
        type: "GET_GENRES",
        payload: genres.data,
      });
    
  };
}

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

export function creategame(data) {
  return async function () {
    const creategame = await axios.post(
      "http://localhost:3001/videogames",
      data
    );
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderbygenre(payload) {
  return {
    type: "ORDER_BY_GENRE",
    payload,
  };
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}
export function orderByRating(payload){
    return{
        type: "ORDER_BY_RATING",
        payload
    }
}