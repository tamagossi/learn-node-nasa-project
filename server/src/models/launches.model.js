const axios = require('axios');

const launchesSchema = require('./launches.schema');
const planetSchema = require('./planet.schema');

const DEFAULT_FLIGHT_NUMBER = 1;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4';

async function abortLaunchById(id) {
	const aborted = await launchesSchema.updateOne(
		{ flightNumber: id },
		{ upcoming: false, success: false }
	);

	return aborted.ok === 1 && aborted.nModified === 1;
}

async function checkIfLaunchIsExist(flightNumber) {
	return await getLaunch({ flightNumber });
}

async function getLaunch(filter) {
	return await launchesSchema.findOne(filter);
}

async function getLaunches() {
	return await launchesSchema.find();
}

async function loadLaunchesData() {
	try {
		if (checkIfSpaceXDataIsLoaded()) return;

		console.log(`--- ⬇️⬇️ Loading launch data from SpaceX ⬇️⬇️ ---`);
		const response = await axios.post(`${SPACEX_API_URL}/launches/query`, {
			query: {},
			options: {
				pagination: false,
				populate: [
					{ path: 'rocket', select: { name: 1 } },
					{
						path: 'payloads',
						select: {
							customers: 1,
						},
					},
				],
			},
		});

		if (response.status !== 200) {
			console.log(`--- ❗️❗️ Problem downloading spaceX data ❗️❗️ ---`);
			throw new Error('Problem downloading spaceX data');
		}

		return populateSpaceXLaunchesData(response.data.docs);
	} catch (error) {
		throw new Error(error);
	}
}

async function checkIfSpaceXDataIsLoaded() {
	const launch = await getLaunch({
		flightNumber: 1,
		rocket: 'Falcon 1',
		mission: 'FalconSat',
	});

	return launch ? true : false;
}

async function populateSpaceXLaunchesData(launchData) {
	let launches = [];

	for (const data of launchData) {
		const { payloads } = data.payloads;
		const customers = payloads.flatMap((payload) => payload.customers);

		const launch = {
			customers,
			flightNumber: data.flight_number,
			launchDate: data.date_local,
			mission: data.name,
			rocket: data.rocket.name,
			success: data.success,
			upcoming: data.upcoming,
		};

		await saveLaunch(launch);
	}

	return launches;
}

async function scheduleNewLaunch(launch) {
	try {
		const planet = await planetSchema.findOne({
			kaplerName: launch.target,
		});

		if (!planet) throw new Error('No matching planet found');

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

async function saveLaunch(launch) {
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
	checkIfLaunchIsExist,
	getLaunches,
	loadLaunchesData,
	scheduleNewLaunch,
};
