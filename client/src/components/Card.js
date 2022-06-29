import React from 'react';

const Card = ({ image, name, genres }) => {
	return (
		<div>
			<h3>{name}</h3>
			<img src={image} alt="Img not found" width="200px" height="250px" />
			<div>
				<span>{genres.join(' - ')}</span>
			</div>
		</div>
	)
}

export default Card;