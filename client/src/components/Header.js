// import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
	return (
		<>
			<header className='site-header'>
				<div className='header main'>
					<h1 className='site-title'>
						<Link to={'/'}><span>B</span>lack <span>M</span>esa <span>G</span>ames</Link>
					</h1>

					<div className='search'>
						<SearchBar />
					</div>
				</div>
			</header>
		</>
	)
}

export default Header;