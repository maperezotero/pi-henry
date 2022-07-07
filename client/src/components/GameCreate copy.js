import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, postVideogames } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';

function validate(input) {
	let errors = {};
	if (!input.name) {
		errors.name = 'Name is required';
	}
	if (!input.image) {
		errors.image = 'Image URL is required';
	}
	if (!input.description) {
		errors.description = 'Description is required';
	}
	
	return errors;
}

const GameCreate = () => {

	const dispatch = useDispatch();
	const history = useHistory();
	const allGenres = useSelector((state) => state.genres);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch, ]);

	const [input, setInput] = useState({
		name: '',
		image: '',
		description: '',
		released: '',
		rating: '',
		platforms: [],
		genres: []
	});

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
		setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}))
	}

	function handlePlatformsSelect(e) {
		if (!input.platforms.includes(e.target.value) && e.target.value !== 'select') {
			setInput({
				...input,
				platforms: [ ...input.platforms, e.target.value ]
			})
		}
	}

	function handleGenresSelect(e) {
		if (!input.genres.includes(e.target.value)) {
			setInput({
				...input,
				genres: [ ...input.genres, e.target.value ]
			})
		}
		console.log(input.genres);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!input.name || !input.image || !input.description || !input.released || !input.rating || input.platforms.length < 1 || input.genres.length < 1) {
			return alert('You must complete the form')
		}
		dispatch(postVideogames(input));
		alert('Videogame Created');
		setInput({
			name: '',
			image: '',
			description: '',
			released: '',
			rating: '',
			platforms: [],
			genres: []
		});
		history.push('/home');
	}

	function handleDeletePlatform(p) {
		setInput({
			...input,
			platforms: input.platforms.filter(el => el !== p)
		})
	}

	function handleDeleteGenre(g) {
		setInput({
			...input,
			genres: input.genres.filter(el => el !== g)
		})
	}

	return (
		<div className='site-main'>
			<Header />
			<Link to='/home'><button>Back</button></Link>
			<h1>Create Videgame</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label>Name: </label>
					<input 
						type='text'
						value={input.name}
						name='name'
						onChange={handleChange}
					/>
					{ errors.name && (<p className="error">{errors.name}</p>)}
				</div>

				<div>
					<label>Image: </label>
					<input 
						type='text'
						value={input.image}
						name='image'
						onChange={handleChange}
					/>
					{ errors.image && (<p className="error">{errors.image}</p>)}
				</div>

				<div>
					<label>Description: </label>
					<textarea 
						name='description' 
						value={input.description} 
						onChange={handleChange}
					></textarea>
					{ errors.description && (<p className="error">{errors.description}</p>)}
				</div>

				<div>
					<label>Released: </label>
					<input 
						type='text'
						value={input.released}
						name='released'
						onChange={handleChange}
					/>
				</div>

				<div>
					<label>Rating: </label>
					<input 
						type='text'
						value={input.rating}
						name='rating'
						onChange={handleChange}
					/>
				</div>

				<div>
					<label>Platforms: </label>
					<select onChange={(e) => handlePlatformsSelect(e)}>
						<option value='select'>Select platform</option>
						<option value='PC'>PC</option>
						<option value='PlayStation'>PlayStation</option>
						<option value='Xbox'>Xbox</option>
						<option value='iOS'>iOS</option>
						<option value='Android'>Android</option>
						<option value='Apple Macintosh'>Apple Macintosh</option>
						<option value='Linux'>Linux</option>
						<option value='Nintendo'>Nintendo</option>
						<option value='Web'>Web</option>
					</select>
				</div>
				{input.platforms.map((p) => 
					// <div key={p}>
					// 	<button type='button' onClick={() => handleDeletePlatform(p)}>{p}</button>
					// </div>
					<button style={{ margin: '.5rem .2rem' }} key={p} type='button' onClick={() => handleDeletePlatform(p)}>{p}</button>
				)}


				<div>
					<label>Genres: </label>
					<select onChange={(e) => handleGenresSelect(e)}>
						{allGenres.map((gen) => (
							<option value={gen.name} key={gen.id}>{gen.name}</option>
						))}
					</select>
				</div>
				{input.genres.map((g) => 
					<button style={{ margin: '.5rem .2rem' }} key={g} type='button' onClick={() => handleDeleteGenre(g)}>{g}</button>
				)}

				<div style={{ margin: '2rem 0' }}>
					<button 
						type='submit'
					>Create Videogame</button>
				</div>
			</form>
		</div>
	)
}

export default GameCreate;