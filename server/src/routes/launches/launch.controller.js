const { launches } = require('../../models/launches.model');

function getLaunches(_, res) {
	try {
		return res.status(200).json(Array.from(launches.values()));
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	getLaunches,
};
