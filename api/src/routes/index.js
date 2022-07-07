require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Genre, Videogame } = require('../db');
// const e = require('express');

const genresRouter = require('./genres');
// const videogamesRouter = require('./videogames');
const videogameRouter = require('./videogame');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {

	try {
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
	} catch (error) {
		res.status(404).json({message: error.message});
	}
}

const getDbInfo = async () => {
	try {
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
	} catch (error) {
		res.status(404).json({message: error.message});
	}
}

const getAllVideogames = async () => {
	try {
		const apiInfo = await getApiInfo();
		const dbInfo = await getDbInfo();
		const infoTotal = dbInfo.concat(apiInfo);
		return infoTotal;
	} catch (error) {
		res.status(404).json({message: error.message});
	}
}

router.get('/videogames', async (req, res) => {
	try {
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
	} catch (error) {
		res.status(404).json({message: error.message});
	}
});

// router.use('/videogames', videogamesRouter);

router.use('/videogame', videogameRouter);
// router.get('/videogame/:id', async (req, res) => {
// 	const id = req.params.id;
// 	const videogamesTotal = await getAllVideogames();
// 	if(id) {
// 		let videogameId = await videogamesTotal.filter(e => e.id == id);
// 		videogameId.length ?
// 		res.status(200).json(videogameId) :
// 		res.status(404).send('Videogame not found');
// 	}
// });

router.post('/videogames', async (req, res) => {
	try {
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
		// console.log(genresDb);
		gameCreated.addGenres(genresDb);
		res.send('Videogame created successfully.');
	} catch (error) {
		res.status(404).json({message: error.message});
	}
});

router.use('/genres', genresRouter);

// router.get('/genres', async (req, res) => {
// 	const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
// 	await genresApi.data.results.map(el => {
// 		Genre.findOrCreate({
// 			where: { name: el.name }
// 		})
// 	});
// 	const genres = await Genre.findAll();
// 	res.send(genres);
// });


module.exports = router;
