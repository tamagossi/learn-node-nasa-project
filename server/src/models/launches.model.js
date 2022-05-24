const launches = new Map();

const launch = {
	customer: ['TAMAGOSSI GROUP', 'NASA'],
	destination: 'Kepler-442 b',
	flightNumber: 100,
	launchDate: new Date('Descember 27, 2030'),
	mission: 'Kepler Exploration X',
	rocket: 'Explorer 1S1',
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
	launches,
};
