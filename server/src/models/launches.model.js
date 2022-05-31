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
	return await launchesSchema.findOne({ flightNumber });
}

async function getLaunches() {
	return await launchesSchema.find();
}

async function loadLaunchesData() {
	try {
		const response = await axios.post(`${SPACEX_API_URL}/launches/query`, {
			query: {},
			options: {
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

		return populateSpaceXLaunchesData(response.data.docs);
	} catch (error) {
		throw new Error(error);
	}
}

function populateSpaceXLaunchesData(launchData) {
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

		launches.push(launch);
	}

	return launches;
}

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
	checkIfLaunchIsExist,
	getLaunches,
	loadLaunchesData,
	scheduleNewLaunch,
};
