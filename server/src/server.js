require('dotenv').config();
const http = require('http');

const app = require('./app');
const { loadPlanetsData } = require('./models/planet.model');
const { loadLaunchesData } = require('./models/launches.model');
const { connectMongo } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
	await connectMongo();
	await loadPlanetsData();
	await loadLaunchesData();

	server.listen(PORT, () => {
		console.log(`------- ℹ️  App running and listening to port ${PORT} ℹ️  -------`);
	});
};

startServer();
