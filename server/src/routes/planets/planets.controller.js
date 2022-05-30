const planetModel = require('../../models/planet.model');

async function getPlanets(_, res) {
	try {
		return res.status(200).json(await planetModel.getPlanets());
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	getPlanets,
};
