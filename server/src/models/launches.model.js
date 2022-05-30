const launchesSchema = require('./launches.schema');
const planetSchema = require('./planet.schema');
const planetSchema = require('./planet.schema');

const DEFAULT_FLIGHT_NUMBER = 1;
const DEFAULT_LAUNCH = {
	customers: ['TAMAGOSSI GROUP', 'NASA'],
	destination: 'Kepler-442 b',
	flightNumber: 1,
	launchDate: new Date('Descember 27, 2030'),
	mission: 'Kepler Exploration X',
	rocket: 'Explorer 1S1',
	upcoming: true,
	success: true,
};

const launches = new Map();
launches.set(DEFAULT_LAUNCH.flightNumber, DEFAULT_LAUNCH);

async function scheduleNewLaunch(launch) {
	try {
		const flightNumber = (await getLatestFlightNumber()) + 1;

		const newLaunch = {
			...launch,
			flightNumber,
			customers: ['TAMAGOSSI GROUP', 'NASA'],
			success: true,
			upcoming: true,
		};

		await saveLaunch(newLaunch);
	} catch (error) {
		throw new Error(error);
	}
}

async function getLatestFlightNumber() {
	const latestLaunch = await launchesSchema.findOne({}).sort('-flightNumber');

	if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
	return latestLaunch.flightNumber;
}

function abortLaunchById(id) {
	const aborted = launches.get(id);

	aborted.upcoming = false;
	aborted.success = false;

	return aborted;
}

function checkIfLaunchIsExist(id) {
	return launches.has(id);
}

async function getLaunches() {
	return await launchesSchema.find();
}

async function saveLaunch(launch) {
	const planet = await planetSchema.findOne({
		kaplerName: launch.target,
	});

	if (!planet) throw new Error('No matching planet found');

	await launchesSchema.updateOne(
		{
			flightNumber: launch.flightNumber,
		},
		launch,
		{ upsert: true }
	);
}

module.exports = {
	abortLaunchById,
	scheduleNewLaunch,
	checkIfLaunchIsExist,
	getLaunches,
	launches,
};
