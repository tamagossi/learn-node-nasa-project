const launchesSchema = require('./launches.schema');
const planetSchema = require('./planet.schema');

const DEFAULT_FLIGHT_NUMBER = 1;

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

async function abortLaunchById(id) {
	const aborted = await launchesSchema.updateOne(
		{ flightNumber: id },
		{ upcoming: false, success: false }
	);

	return aborted.ok === 1 && aborted.nModified === 1;
}

async function checkIfLaunchIsExist(flightNumber) {
	return await launchesSchema.findOne({ flightNumber });
}

async function getLaunches() {
	return await launchesSchema.find();
}

async function saveLaunch(launch) {
	const planet = await planetSchema.findOne({
		kaplerName: launch.target,
	});

	if (!planet) throw new Error('No matching planet found');

	await launchesSchema.findOneAndUpdate(
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
};
