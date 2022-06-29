import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';

const Home = () => {

	const dispatch = useDispatch();
	// Lo siguiente es lo mismo que usar stateMapToProps
	const allVideogames = useSelector((state) => state.videogames);


	function handleClick(e) {
		e.preventDefault();
		dispatch(getVideogames());
	}

	useEffect(() => {
		dispatch(getVideogames()) // Igual que hacer mapDispatchToProps
	}, [dispatch]);

	return (
		<div>
			<Link to='/videogame'>Create Videogame</Link>
			<h1>Videogames Store</h1>
			<button onClick={e => handleClick(e)}>Reload Videogames</button>

			<div>
				<select>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>

				<select>
					<option value="All">All Genres</option>
					<option value="Action">Action</option>
					<option value="Adventure">Adventure</option>
					<option value="Arcade">Arcade</option>
					<option value="Board Games">Board Games</option>
					<option value="Card">Card</option>
					<option value="Casual">Casual</option>
					<option value="Educational">Educational</option>
				</select>

				<select>
					<option value="All">All Videogames</option>
					<option value="created">Created</option>
					<option value="api">Api</option>
				</select>

				{
					allVideogames && allVideogames.map( el => (
						<Card 
							name={el.name} 
							image={el.image} 
							genres={el.genres}
							key={el.id} />
						// <Card name={el.name} image={el.image} key={el.id} />
					))
				}

			</div>
		</div>
	)
}

export default Home;