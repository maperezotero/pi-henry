require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const router = Router();

router.get('/:id', async (req, res) => {
	try {
		const {id} = req.params;

		if (id.length > 8) {
			let response = await Videogame.findByPk(id, {
				include: [
					{
						model: Genre,
						attributes: ["id", "name"],
						through: {
							attributes: [],
						}
					}
				]
			})

			let videogameBd = {
				id: response.id,
				name: response.name,
				image: response.image,
				description: response.description,
				released: response.released,
				rating: response.rating,
				platforms: response.platforms,
				genres: response.genres
			}
			return res.json(videogameBd);
		} else {
			let response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

			let videogameApi = {
				id: response.data.id,
				name: response.data.name,
				image: response.data.background_image,
				description: response.data.description,
				released: response.data.released,
				rating: response.data.rating,
				platforms: response.data.parent_platforms.map(p => p.platform.name),
				genres: response.data.genres
			}
			return res.json(videogameApi);
		}
	} catch (error) {
		res.status(404).json({message: error.message});
	}
});

module.exports = router;