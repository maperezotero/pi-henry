import React from 'react';

const Pagination = ({ gamesPerPage, allVideogames, paginado }) => {

	const pageNumbers = [];

	for (let i = 0; i < Math.ceil(allVideogames / gamesPerPage); i++) {
		pageNumbers.push(i + 1);
	}

	return (
		<nav>
			<div className='pagination'>
				{ 
					pageNumbers && pageNumbers.map(number => (
						<button key={number} onClick={() => paginado(number)}>{number}</button>
					))
				}
			</div>
		</nav>
	)
}

export default Pagination