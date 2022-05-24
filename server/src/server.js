const http = require('http');

const app = require('./app');
const { loadPlanetsData } = require('./models/planet.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const startServer = async () => {
	await loadPlanetsData();

	server.listen(PORT, () => {
		console.log(`App running and listening to port ${PORT}`);
	});
};

startServer();
