const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

const planetSchema = require('./planet.schema');

function isHabitablePlanet(planet) {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
}

const loadPlanetsData = () => {
	return new Promise((resolve, reject) => {
		fs.createReadStream(path.join(__dirname, '../data', 'kepler_data.csv'))
			.pipe(
				parse({
					comment: '#',
					columns: true,
				})
			)
			.on('data', async (data) => {
				if (isHabitablePlanet(data)) await savePlanet(data);
			})
			.on('error', (err) => {
				console.error(err);
				reject();
			})
			.on('end', () => {
				resolve();
			});
	});
};

async function savePlanet(planet) {
	try {
		await planetSchema.updateOne(
			{
				keplerName: planet.kepler_name,
			},
			{
				keplerName: planet.kepler_name,
			},
			{ upsert: true }
		);
	} catch (error) {
		console.error(error);
	}
}

async function getPlanets() {
	return await planetSchema.find({}, { _id: 0, __v: 0 });
}

module.exports = {
	loadPlanetsData,
	getPlanets,
};
