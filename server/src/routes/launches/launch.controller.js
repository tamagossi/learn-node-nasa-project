const { getLaunches, addLaunch } = require('../../models/launches.model');

function httpAddLaunch(req, res) {
	try {
		const launch = req.body;
		const { mission, launchDate, rocket, destination } = launch;

		if (!mission || !launchDate || !rocket || !destination) {
			return res.status(400).json({
				error: `Missing required property`,
			});
		}

		if (new Date(launchDate) === 'Invalid Date') {
			return res.status(400).json({
				error: `Launch date format is invalid`,
			});
		}

		launch.launchDate = new Date(launchDate);
		const newLaunch = addLaunch(launch);

		return res.status(201).json(newLaunch);
	} catch (error) {
		throw new Error(error);
	}
}

function httpGetLaunches(_, res) {
	try {
		const launches = getLaunches();

		return res.status(200).json(launches);
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	httpAddLaunch,
	httpGetLaunches,
};
