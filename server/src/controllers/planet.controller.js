const planets = require('../models/planet.model');

function getAllPlanets(req, res) {
	try {
		return res.status(200).json(planets);
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	getAllPlanets,
};
