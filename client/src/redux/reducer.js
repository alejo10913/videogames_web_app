const initialState = {
  allVideoGames: [],
  byfilter: [],
  allGenres: [],
  detail: {},
  errors: [],
  allPlatforms: [],
  favorites: [],
  results: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        allVideoGames: action.payload,
        byfilter: action.payload,
      };

    case "GET_PLATFORMS":
      return {
        ...state,
        allPlatforms: action.payload,
      };

    case "GAME_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "CLEAN_DETAIL":
      return {
        ...state,
        detail: [],
      };

      case "CLEAN_RESULT":
        return {
          ...state,
          results: [],
        };



    case "GET_NAME_GAME":
      return {
        ...state,
        results: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        allGenres: action.payload,
      };

    case "FILTER_CREATED":
      const game = state.byfilter;

      let createdFilter;
      if (action.payload === "Creado") {
        createdFilter = game.filter((game) => game.createdInDb);
        console.log(createdFilter);
      } else if (action.payload === "Existente") {
        createdFilter = game.filter((game) => !game.createdInDb);
      }
      return {
        ...state,
        allVideoGames: createdFilter,
      };

    case "ORDER_BY_GENRE":
      const filterGen = state.byfilter.filter((game) => {
        if (!game.genres) return undefined;
        return game.genres.includes(`${action.payload}`);
      });

      return {
        ...state,
        allVideoGames: filterGen,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "ascendente"?
        state.allVideoGames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allVideoGames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
            });
      return {
        ...state,
        allVideoGames: sortedArr,
      };

    case "ORDER_BY_RATING":
      let sortedRating =
        action.payload === "min"
          ? state.allVideoGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.allVideoGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
            });
            console.log(sortedRating)
      return {
        ...state,
        allVideoGames: sortedRating,
      };
      //if(input.platforms.includes(e.target.value))

      case "ADD_FAVORITES":
        let fav = state.allVideoGames.find((game) => game.id === action.payload)
        console.log(fav)

  
        return{
          ...state,
          favorites: [...state.favorites, fav]
        }
    
        case "REMOVE_FAVORITES":
          return{
            ...state,
            favorites: state.favorites.filter((game) => game.id !== action.payload)
          }

    default:
      return state;
  }
}

export default rootReducer;
