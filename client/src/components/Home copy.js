import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres, filterByGenre, filterCreated, orderByName } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const Home = () => {

	const dispatch = useDispatch();
	// Lo siguiente es lo mismo que usar stateMapToProps
	const allVideogames = useSelector((state) => state.videogames);
	const allGenres = useSelector((state) => state.genres);

	const [order, setOrder] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [gamesPerPage/* , setGamesPerPage */] = useState(15);

	const indexOfLastGame = currentPage * gamesPerPage; // 15
	const indexOfFirstGame = indexOfLastGame - gamesPerPage; // 0
	const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	}
	
	useEffect(() => {
		dispatch(getVideogames()) // Igual que hacer mapDispatchToProps
	}, [dispatch]);

	useEffect(() => {
	  dispatch(getGenres())
	}, [dispatch])

	function handleReset(e) {
		e.preventDefault();
		dispatch(getVideogames());
		
	}

	function handleSort(e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		paginado(1);
		setOrder(`Order: ${e.target.value}`);
	}

	function handleFilterGenre(e) {
		dispatch(filterByGenre(e.target.value));
		paginado(1);
	}

	function handleFilterOrigin(e) {
		dispatch(filterCreated(e.target.value));
		paginado(1);
	}

	return (
		<div className='site-main'>
			<header className='site-header'>

				<div className='header main'>
					<h1 className='site-title'>
						<Link to={'/'}><span>B</span>lack <span>M</span>esa <span>G</span>ames</Link>
					</h1>

					<div className='search'>
						<SearchBar paginado={paginado} />
					</div>
				</div>

				<div className='header toolbar'>

					<div className="form-group">
						<label>Order: </label>
						<select onChange={e => handleSort(e)}>
							<option value='default'>Default</option>
							<option value='asc'>Ascending</option>
							<option value='desc'>Descending</option>
						</select>
					</div>

					<div className="form-group">
						<label>Genre: </label>
						<select onChange={e => handleFilterGenre(e)}>
							<option value="All">All</option>
							{allGenres?.map((g) => {
								return (
									<option key={g.id} value={g.name}>{g.name}</option>
								);
							})}
						</select>
					</div>

					<div className="form-group">
						<label>Origin: </label>
						<select onChange={e => handleFilterOrigin(e)}>
							<option value="all">All Videogames</option>
							<option value="created">Created</option>
							<option value="api">From API</option>
						</select>
					</div>

					<div className='form-group'>
						<button onClick={e => handleReset(e)}>Reset Filters</button>
						<Link to='/videogame'><button>Create Videogame</button></Link>
					</div>

				</div>

			</header>

			<nav className='pagination'>
				<Pagination 
					gamesPerPage={gamesPerPage}
					allVideogames={allVideogames.length}
					paginado={paginado}
				/>
			</nav>
			
			<div className='main'>
				<div className="cards">	
					{
						currentGames && currentGames.map( el => (
							<Card 
								id={el.id}
								name={el.name} 
								image={el.image} 
								genres={el.genres}
								key={el.id} 
							/>
						))
					}
				</div>
			</div>
		
		</div>
	)
}

export default Home;