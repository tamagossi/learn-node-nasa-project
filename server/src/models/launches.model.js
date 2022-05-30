const launchesSchema = require('./launches.schema');

let latestFlightNumber = 1;
const defaultLaunch = {
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
launches.set(defaultLaunch.flightNumber, defaultLaunch);

async function addLaunch(launch) {
	try {
		latestFlightNumber++;
		launches.set(latestFlightNumber, {
			...launch,
			customers: ['TAMAGOSSI GROUP', 'NASA'],
			flightNumber: latestFlightNumber,
			success: true,
			upcoming: true,
		});

		await saveLaunch(launch);
		return launches.get(latestFlightNumber);
	} catch (error) {
		throw new Error(error);
	}
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
	addLaunch,
	checkIfLaunchIsExist,
	getLaunches,
	launches,
};
