import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, image, name, genres }) => {
	return (
		<div className='card'>
			<div className='img'>
				<img src={image} alt={name} />
			</div>
			<h3><Link to={`/videogame/${id}`}>{name}</Link></h3>
			<div>
				<span>{genres.join(' - ')}</span>
			</div>
		</div>
	)
}

export default Card;