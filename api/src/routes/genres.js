require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db');
const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res) => {
	try {
		const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
		await genresApi.data.results.map(el => {
			Genre.findOrCreate({
				where: { name: el.name }
			})
		});
		const genres = await Genre.findAll();
		res.send(genres);
	} catch (error) {
		res.status(404).json({message: error.message});
	}
});

module.exports = router;