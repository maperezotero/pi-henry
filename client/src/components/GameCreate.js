import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getGenres, postVideogames } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';

const GameCreate = () => {

	const dispatch = useDispatch();
	const allGenres = useSelector((state) => state.genres);
	const [errors, setErrors] = useState({});
	const history = useHistory();

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

	let noEmpty = /\S+/;
	let validateName = /^.{5,200}$/;
	let validateRating = /^[1-5]+([.][1-5]+)?$/;
	let validateImageUrl = /(https?:\/\/.*\.(?:png|jpg))/i;
	let validateReleaseDate = /^\d{4}-\d{2}-\d{2}$/;
	// let validateReleaseDate = /^\d{4}\/\d{2}\/\d{2}$/;
	// let validateReleaseDate = /^\d{4}-\d{2}-\d{2}$/;
	let validateDescription = /^.{5,1000}$/;

	function validate(input) {
		let errors = {}
		if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name < 3) {
			errors.name = 'Name is required and must have more than 3 characters';
		}
		if (!validateImageUrl.test(input.image)) {
			errors.image = 'You must provide a valid image URL';
		}
		if (!validateDescription.test(input.description) || parseInt(input.description) < 1) {
			errors.description = 'Description should be between 5 and 1000 characters'
		}
		if (!validateReleaseDate.test(input.released)) {
			errors.released = 'Release date is required';
		}
		if (!validateRating.test(input.rating) || parseInt(input.rating) < 1) {
			errors.rating = 'Rating must be a number between 1 and 5';
		}
		if (input.genres.length < 1) {
			errors.genres = 'You must select 1 genre minimum';
		}

		return errors;
	}

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
		if (!input.genres.includes(e.target.value) && e.target.value !== 'select') {
			setInput({
				...input,
				genres: [ ...input.genres, e.target.value ]
			})
			setErrors(validate({
				...input,
				[e.target.name]: e.target.value
			}))
		}
		console.log(input.genres);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!input.name || !input.image || !input.description || !input.released || !input.rating || input.platforms.length < 1 || input.genres.length < 1) {
			return alert('You must complete the form')
		}
		if (
			!errors.name &&
			!errors.image &&
			!errors.description &&
			!errors.released &&
			!errors.rating &&
			!errors.genres
		) {
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
		} else {
			return alert('There are some errors in the form.');
		}
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

			<div className="create-form">
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className='form-group'>
						<label>Name: </label>
						<input 
							type='text'
							value={input.name}
							name='name'
							onChange={handleChange}
						/>
						{ errors.name && (<p className="error">{errors.name}</p>)}
					</div>

					<div className='form-group'>
						<label>Image: </label>
						<input 
							type='text'
							value={input.image}
							name='image'
							onChange={handleChange}
						/>
						{ errors.image && (<p className="error">{errors.image}</p>)}
					</div>

					<div className='form-group'>
						<label>Description: </label>
						<textarea 
							name='description' 
							value={input.description} 
							onChange={handleChange}
						></textarea>
						{ errors.description && (<p className="error">{errors.description}</p>)}
					</div>

					<div className='form-group'>
						<label>Released: </label>
						<input 
							type='text'
							value={input.released}
							name='released'
							placeholder='YYYY-MM-DD'
							onChange={handleChange}
						/>
						{ errors.released && (<p className="error">{errors.released}</p>)}
					</div>

					<div className='form-group'>
						<label>Rating: <span className='input-rating'>{input.rating}</span></label>
						<input 
							type='range'
							value={input.rating}
							name='rating'
							min='0'
							max='5'
							step='0.1'
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
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
						<span key={p} type='button' onClick={() => handleDeletePlatform(p)}>X {p}</span>
					)}


					<div className='form-group'>
						<label>Genres: </label>
						<select onChange={(e) => handleGenresSelect(e)}>
							<option value='select'>Select genre</option>
							{allGenres.map((gen) => (
								<option value={gen.name} key={gen.id}>{gen.name}</option>
							))}
						</select>
					</div>
					{input.genres.map((g) => 
						<p className='form-tag' key={g} type='button' onClick={() => handleDeleteGenre(g)}>
							<span>x</span> {g}
						</p>
					)}
					{ errors.genres && (<p className="error">{errors.genres}</p>)}

					<div className='submit-button'>
						<button 
							type='submit'
						>Create Videogame</button>
					</div>
				</form>
			</div>


		</div>
	)
}

export default GameCreate;