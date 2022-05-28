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

function addLaunch(launch) {
	try {
		latestFlightNumber++;
		launches.set(latestFlightNumber, {
			...launch,
			customers: ['TAMAGOSSI GROUP', 'NASA'],
			flightNumber: latestFlightNumber,
			success: true,
			upcoming: true,
		});

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

function getLaunches() {
	return Array.from(launches.values());
}

module.exports = {
	abortLaunchById,
	addLaunch,
	checkIfLaunchIsExist,
	getLaunches,
	launches,
};
