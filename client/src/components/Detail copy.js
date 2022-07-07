import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetail, resetDetail } from '../actions';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Header from './Header';

const Detail = () => {

	let myVideogame = useSelector((state) => state.detail);

	const dispatch = useDispatch();
	const {id} = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
		dispatch(resetDetail());
	}, [dispatch, id]);

	return (
		<div className='site-main'>
			<Header />
			<Link to='/home'><button>Back</button></Link>
			{myVideogame ? (
			<div className='main detail'>
				<div className="img">
					<img src={myVideogame.image} alt="alt text" />
				</div>
				<div className="info">
					<h1>{myVideogame.name}</h1>
					{ parse(`${myVideogame.description}`) }
					<p>Released: {myVideogame.released}</p>
					<p>Platforms: {myVideogame.platforms?.map((p, i) => (
						<span key={i}>{p}</span>
					))}</p>
					<p>Genres: 
					{
						myVideogame.genres?.map((g, i) => (
							<span key={i}>{g.name}</span>
						))
					}
					</p>
				</div>
			</div>
			) : (
				<div>
					<h2>Loading</h2>
				</div>
			)
			}
		</div>
	)
}

export default Detail;