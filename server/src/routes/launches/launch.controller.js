const { getPagination } = require('../../services/query');
const {
	abortLaunchById,
	scheduleNewLaunch,
	checkIfLaunchIsExist,
	getLaunches,
} = require('../../models/launches.model');

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
		const newLaunch = scheduleNewLaunch(launch);

		return res.status(201).json(newLaunch);
	} catch (error) {
		throw new Error(error);
	}
}

async function httpAbortLaunch(req, res) {
	try {
		const { id } = req.params;

		const isLaunchExist = await checkIfLaunchIsExist(Number(id));
		if (!isLaunchExist) {
			return res.status(404).json({
				error: 'Launch not found',
			});
		}

		const aborted = await abortLaunchById(Number(id));

		if (!aborted) {
			return res.status(400).json({
				message: 'Launch not aborted',
			});
		} else {
			return res.status(200).json({
				message: 'Launch aborted',
			});
		}
	} catch (error) {
		throw new Error(error);
	}
}

function httpGetLaunches(req, res) {
	try {
		const { skip, limit } = getPagination(req.query);

		const launches = getLaunches(skip, limit);

		return res.status(200).json(launches);
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = {
	httpAddLaunch,
	httpAbortLaunch,
	httpGetLaunches,
};
