import {
	GET_VIDEOGAMES,
	GET_GENRES,
	FILTER_BY_GENRE,
	FILTER_CREATED,
	ORDER_BY_NAME,
	GET_GAMES_BY_NAME,
	GET_DETAIL,
	RESET_DETAIL
} from '../actions';

const initialState = {
	videogames: [],
	allVideogames: [],
	genres: [],
	detail: []
};

function rootReducer(state = initialState, action) {

	switch (action.type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				videogames: action.payload,
				allVideogames: action.payload
			}
		case GET_GAMES_BY_NAME:
			return {
				...state,
				videogames: action.payload
			}
		case GET_GENRES:
			return {
				...state,
				genres: action.payload,
			}
		case FILTER_BY_GENRE:
			const allVideogames = state.allVideogames;
			const genreFiltered =
				action.payload === 'All'
				? allVideogames
				: allVideogames.filter(games => 
					games.genres.includes(action.payload)
				)
			return {
				...state,
				videogames: genreFiltered
			}
		case FILTER_CREATED:
			const allVideogames2 = state.allVideogames;
			const createdFilter = action.payload === 'created' 
				? allVideogames2.filter(el => el.createdInDb)
				: allVideogames2.filter(el => !el.createdInDb)
			return {
				...state,
				videogames: action.payload === 'all' ? state.allVideogames : createdFilter
			}
		case ORDER_BY_NAME:
			let sortedArr = action.payload === 'asc'
				? state.videogames.sort(function(a, b){
					if( a.name > b.name ) {
						return 1;
					}
					if ( b.name > a.name ) {
						return -1;
					}
					return 0;
				})
				: state.videogames.sort(function(a, b){
					if( a.name > b.name ) {
						return -1;
					}
					if ( b.name > a.name ) {
						return 1;
					}
					return 0;
				})
			return {
				...state,
				videogames: sortedArr
			}
			case 'POST_VIDEOGAME': 
				return {
					...state
				}
			case GET_DETAIL:
				return {
					...state,
					detail: action.payload
				}
			case RESET_DETAIL:
				return {
					...state,
					detail: {}
				}
		default:
			return state;
	}

};

export default rootReducer;