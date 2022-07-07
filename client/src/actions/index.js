import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_GAMES_BY_NAME ='GET_GAMES_BY_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const RESET_DETAIL = 'RESET_DETAIL';

export function getVideogames() {
	return async function(dispatch) {
		let json = await axios.get('http://localhost:3001/videogames');
		return dispatch({
			type: GET_VIDEOGAMES,
			payload: json.data
		});
	}
}

export function getGamesByName(payload) {
	return async function(dispatch) {
		try {
			let json = await axios.get('http://localhost:3001/videogames?name=' + payload);
			return dispatch({
				type: GET_GAMES_BY_NAME,
				payload: json.data
			})
		} catch (error) {
			console.log(error);
		}
	}
}

export function getGenres() {
	return async function(dispatch) {
		let json = await axios.get('http://localhost:3001/genres')
		return dispatch({
			type: GET_GENRES,
			payload: json.data
		})
	}
}

export function filterByGenre(payload) {
	return {
		type: FILTER_BY_GENRE,
		payload
	}
}

export function filterCreated(payload) {
	return {
		type: FILTER_CREATED,
		payload
	}
}

export function orderByName(payload) {
	return {
		type: ORDER_BY_NAME,
		payload
	}
}

export function postVideogames(payload) {
	return async function(dispatch) {
		let response = axios.post('http://localhost:3001/videogames', payload);
		console.log(response);
		return response;
	}
}

export function getDetail(payload) {
	return async function(dispatch) {
		try {
			let json = await axios.get('http://localhost:3001/videogame/' + payload);
			return dispatch({
				type: GET_DETAIL,
				payload: json.data
			})
		} catch (error) {
			console.log(error);
		}
	}
}

export function resetDetail() {
	return ({
		type: RESET_DETAIL
	})
}