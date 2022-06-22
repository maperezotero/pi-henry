require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Genre, Videogame } = require('../db');
const e = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
	const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50`);
	const apiInfo = await apiUrl.data.results.map(el => {
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
	return await Videogame.findAll({
		include: {
			model: Genre,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		}
	})
}

const getAllVideogames = async () => {
	const apiInfo = await getApiInfo();
	const dbInfo = await getDbInfo();
	const infoTotal = apiInfo.concat(dbInfo);
	return infoTotal;
}

router.get('/videogames', async (req, res) => {
	const name = req.query.name;
	// console.log(name);
	let videogamesTotal = await getAllVideogames();
	if (name){
		let videogameName = videogamesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()) );
		videogameName.length ?
		res.status(200).send(videogameName) :
		res.status(404).send('Videogame not found.');
	} else {
		res.status(200).send(videogamesTotal);
	}
});

router.get('/genres', async (req, res) => {
	const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
	// const results = await genresApi.data.results.map(el => {
	await genresApi.data.results.map(el => {
		Genre.findOrCreate({
			where: { name: el.name }
		})
		// console.log(el.name);
	});
	const genres = await Genre.findAll();
	res.send(genres);
})


module.exports = router;
