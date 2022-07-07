import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
	<div className='landing'>
		<div className="content">
			<h1><span>B</span>LACK <span>M</span>ESA <span>G</span>AMES</h1>
			<Link to='/home'>
				<button>Enter</button>
			</Link>
		</div>
	</div>
  )
}

export default LandingPage;