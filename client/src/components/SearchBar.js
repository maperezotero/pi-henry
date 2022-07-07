import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGamesByName } from '../actions';

const SearchBar = ({paginado}) => {

	const dispatch = useDispatch();
	const [name, setName] = useState('');
	
	function handleInputChange(e) {
		// e.preventDefault();
		setName(e.target.value);
		console.log(name);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getGamesByName(name));
		setName('');
		paginado(1);
	}

	return (
		<form>
			<input 
				type="text"
				placeholder='Search game...'	
				onChange={(e) => handleInputChange(e)}
				value={name}
				maxLength='300'
			/>
			<button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
		</form>
	)
}

export default SearchBar;