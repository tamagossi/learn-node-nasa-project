let latestFlightNumber = 1;
const launch = {
	customer: ['TAMAGOSSI GROUP', 'NASA'],
	destination: 'Kepler-442 b',
	flightNumber: 1,
	launchDate: new Date('Descember 27, 2030'),
	mission: 'Kepler Exploration X',
	rocket: 'Explorer 1S1',
	upcoming: true,
	success: true,
};

const launches = new Map();
launches.set(launch.flightNumber, launch);

function addLaunch(launch) {
	try {
		latestFlightNumber++;
		launches.set(latestFlightNumber, {
			...launch,
			customer: ['TAMAGOSSI GROUP', 'NASA'],
			flightNumber: latestFlightNumber,
			success: true,
			upcoming: true,
		});

		return launches.get(latestFlightNumber);
	} catch (error) {
		throw new Error(error);
	}
}

function getLaunches() {
	return Array.from(launches.values());
}

module.exports = {
	addLaunch,
	getLaunches,
	launches,
};
