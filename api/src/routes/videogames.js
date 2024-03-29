require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const router = Router();

const getApiInfo = async () => {

	let page1 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;
	let page2 = (await axios.get(`${page1.next}`)).data;
	let page3 = (await axios.get(`${page2.next}`)).data;
	let page4 = (await axios.get(`${page3.next}`)).data;
	let page5 = (await axios.get(`${page4.next}`)).data;

	let allPages = [
		...page1.results, 
		...page2.results, 
		...page3.results, 
		...page4.results, 
		...page5.results
	];

	const apiInfo = allPages.map(el => {
		return {
			id: el.id,
			image: el.background_image,
			name: el.name,
			released: el.released,
			rating: el.rating,
			platforms: el.platforms.map( el => el.platform.name ),
			genres: el.genres.map( el => el.name ),
			description: el.description,
		}
	});
	return apiInfo;
}

const getDbInfo = async () => {
	const dbGames = await Videogame.findAll({
		include: {
			model: Genre,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		}
	})
	return dbGames.map((v) => {
		return {
			...v.dataValues,
			genres: v.genres.map(e => e.name)
		}
	})
}

const getAllVideogames = async () => {
	const apiInfo = await getApiInfo();
	const dbInfo = await getDbInfo();
	const infoTotal = dbInfo.concat(apiInfo);
	return infoTotal;
}

router.get('/', async (req, res) => {
	const name = req.query.name;
	let videogamesTotal = await getAllVideogames();
	if (name){
		let videogameName = videogamesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()) );
		videogameName.length ?
		res.status(200).send(videogameName.slice(0, 15)) :
		res.status(404).send('Videogame not found.');
	} else {
		res.status(200).send(videogamesTotal);
	}
});


router.post('/', async (req, res) => {
	let { image, name, description, released, rating, platforms, createdInDb, genres  } = req.body;
	console.log(req.body);
	let gameCreated = await Videogame.create({
		image,
		name,
		description, 
		released,
		rating,
		platforms,
		createdInDb
	});

	let genresDb = await Genre.findAll({
		where: {
			name: genres
		} 
	})
	console.log(genresDb);
	gameCreated.addGenres(genresDb);
	res.send('Videogame created successfully.');
});

module.exports = router;