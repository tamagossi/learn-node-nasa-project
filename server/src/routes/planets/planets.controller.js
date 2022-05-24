const { planets } = require('../../models/planet.model');

function getPlanets(_, res) {
	try {
		return res.status(200).json(planets);
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	getPlanets,
};
